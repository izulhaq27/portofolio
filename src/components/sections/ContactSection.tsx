"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ContactSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setSuccess(false), 5000);
      } else {
        alert("Gagal mengirim pesan. Silakan coba lagi.");
      }
    } catch (error) {
      alert("Terjadi kesalahan jaringan.");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="contact" className="py-24 px-6 bg-secondary/5 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={itemVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1.5 bg-accent mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-secondary max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? Feel free to reach out.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-12"
        >
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
            <div className="bg-background border border-border rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mr-4">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-1">Email</h4>
                    <a href="mailto:muhammadfahrizulhah@gmail.com" className="text-foreground hover:text-accent transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap">
                      muhammadfahrizulhah@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mr-4">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-1">WhatsApp</h4>
                    <a href="https://wa.me/6281456009540" className="text-foreground hover:text-accent transition-colors">
                      +62 814-5600-9540
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mr-4">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-1">Location</h4>
                    <p className="text-foreground">
                      Bojonegoro, East Java, Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <div className="bg-background border border-border rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-foreground mb-6">Send Me a Message</h3>

              {success ? (
                <div className="bg-success/10 border border-success/20 text-success p-6 rounded-xl flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-success text-white rounded-full flex items-center justify-center">
                    <Send className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold">Message Sent!</h4>
                  <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                  <Button variant="outline" className="mt-4" onClick={() => setSuccess(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-secondary/5 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                        placeholder="name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-secondary/5 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                        placeholder="emailaddres@gmail.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-secondary/5 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                      placeholder="Project Inquiry"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-secondary/5 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none"
                      placeholder="Hello, I'd like to talk about..."
                    ></textarea>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
