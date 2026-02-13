import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const contactEmail = Deno.env.get("CONTACT_EMAIL");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactRequest = await req.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      throw new Error("Missing required fields");
    }

    if (!contactEmail) {
      throw new Error("Contact email not configured");
    }

    const emailResponse = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [contactEmail],
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: monospace; background: #0a0a0c; color: #e0e0e0; padding: 24px; border-radius: 8px;">
          <h1 style="color: #00f5ff; margin-bottom: 24px;">&lt;new_message/&gt;</h1>
          
          <div style="margin-bottom: 16px;">
            <strong style="color: #00f5ff;">From:</strong> ${name}
          </div>
          
          <div style="margin-bottom: 16px;">
            <strong style="color: #00f5ff;">Email:</strong> <a href="mailto:${email}" style="color: #00ff88;">${email}</a>
          </div>
          
          <div style="margin-bottom: 16px;">
            <strong style="color: #00f5ff;">Subject:</strong> ${subject}
          </div>
          
          <div style="margin-bottom: 16px;">
            <strong style="color: #00f5ff;">Message:</strong>
            <div style="background: #1a1a1f; padding: 16px; border-radius: 4px; border-left: 3px solid #00f5ff; margin-top: 8px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #333;">
            <span style="color: #666;">// Sent from your portfolio contact form</span>
          </div>
        </div>
      `,
      replyTo: email,
    });

    console.log("Contact email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
