import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, subject, message, serviceType } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format the email content
    const emailContent = `
New Contact Form Submission from Beats Medical Website

Contact Details:
- Name: ${name}
- Email: ${email}
- Phone: ${phone || 'Not provided'}
- Company: ${company || 'Not provided'}
- Service Interest: ${serviceType || 'Not specified'}

Subject: ${subject}

Message:
${message}

---
This message was sent from the Beats Medical website contact form.
Timestamp: ${new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })}
    `.trim();

    // Format WhatsApp message
    const whatsappMessage = `
*New Contact Form Submission*

👤 *Name:* ${name}
📧 *Email:* ${email}
📱 *Phone:* ${phone || 'Not provided'}
🏢 *Company:* ${company || 'Not provided'}
🔧 *Service:* ${serviceType || 'Not specified'}

📋 *Subject:* ${subject}

💬 *Message:*
${message}

_Sent from Beats Medical website_
    `.trim();

    console.log('Contact form submission:', {
      name,
      email,
      phone,
      company,
      subject,
      message,
      serviceType,
      timestamp: new Date().toISOString()
    });

    // Send email
    const emailResult = await sendEmail(emailContent, email, subject, name);
    
    // Generate WhatsApp link
    const whatsappUrl = generateWhatsAppUrl(whatsappMessage);

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        emailSent: emailResult.success,
        whatsappUrl: whatsappUrl,
        submissionId: generateSubmissionId(),
        emailError: emailResult.error || null
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Email sending function
async function sendEmail(content: string, senderEmail: string, subject: string, senderName: string) {
  try {
    // Create transporter using Gmail SMTP
    // Note: In production, use environment variables for credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com', // Replace with actual email
        pass: process.env.EMAIL_PASS || 'your-app-password'     // Replace with actual app password
      }
    });

    // Email options
    const mailOptions = {
      from: `"${senderName}" <${process.env.EMAIL_USER || 'your-email@gmail.com'}>`,
      to: 'sales@beatsmed.com',
      replyTo: senderEmail,
      subject: `Contact Form: ${subject}`,
      text: content,
      html: content.replace(/\n/g, '<br>')
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Generate WhatsApp URL
function generateWhatsAppUrl(message: string): string {
  const phoneNumber = '971565225437'; // Remove + for WhatsApp API
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

// Generate unique submission ID
function generateSubmissionId(): string {
  return `SUB_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}