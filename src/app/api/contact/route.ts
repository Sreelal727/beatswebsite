import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // max 5 requests per window
};

// Input validation
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  subject?: string;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateInput(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!data.email || !validateEmail(data.email)) {
    errors.push('Please provide a valid email address');
  }
  
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }
  
  if (data.phone && data.phone.length > 0 && data.phone.length < 8) {
    errors.push('Please provide a valid phone number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const userLimit = rateLimitStore.get(ip);
  
  if (!userLimit || now > userLimit.resetTime) {
    // Reset or create new limit window
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs
    });
    return { allowed: true };
  }
  
  if (userLimit.count >= RATE_LIMIT.maxRequests) {
    return { allowed: false, resetTime: userLimit.resetTime };
  }
  
  // Increment count
  userLimit.count++;
  rateLimitStore.set(ip, userLimit);
  return { allowed: true };
}

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, limit] of rateLimitStore.entries()) {
    if (now > limit.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}, 5 * 60 * 1000); // Clean up every 5 minutes

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const headersList = await headers();
    const forwarded = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip');
    const ip = forwarded ? forwarded.split(',')[0] : realIp || 'unknown';

    // Check rate limit
    const rateLimitResult = checkRateLimit(ip);
    if (!rateLimitResult.allowed) {
      const resetTime = rateLimitResult.resetTime || Date.now();
      const resetIn = Math.ceil((resetTime - Date.now()) / 1000 / 60); // minutes
      
      return NextResponse.json(
        { 
          success: false, 
          error: `Too many requests. Please try again in ${resetIn} minutes.` 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': resetIn.toString(),
            'X-RateLimit-Limit': RATE_LIMIT.maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': resetTime.toString()
          }
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = validateInput(body);
    
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed', 
          details: validation.errors 
        },
        { status: 400 }
      );
    }

    const formData: ContactFormData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || '',
      company: body.company?.trim() || '',
      message: body.message.trim(),
      subject: body.subject?.trim() || 'New Contact Form Submission'
    };

    // Log the submission (in production, save to database)
    console.log('Contact form submission:', {
      timestamp: new Date().toISOString(),
      ip,
      data: formData
    });

    // Here you can add multiple notification methods:
    
    // 1. Send email notification (implement with nodemailer, sendgrid, etc.)
    // await sendEmailNotification(formData);
    
    // 2. Save to database
    // await saveToDatabase(formData);
    
    // 3. Send to Slack/Discord webhook
    // await sendToSlack(formData);
    
    // 4. Forward to Formspree as backup
    try {
      const formspreeResponse = await fetch('https://formspree.io/f/manpbogk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!formspreeResponse.ok) {
        console.warn('Formspree backup failed:', formspreeResponse.statusText);
      }
    } catch (error) {
      console.warn('Formspree backup error:', error);
    }

    // Success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We will get back to you soon.',
        timestamp: new Date().toISOString()
      },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT.maxRequests.toString(),
          'X-RateLimit-Remaining': (RATE_LIMIT.maxRequests - (rateLimitStore.get(ip)?.count || 0)).toString()
        }
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}