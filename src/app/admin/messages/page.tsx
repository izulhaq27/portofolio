"use client";

import { useState, useEffect } from "react";
import { Trash2, Loader2, Mail, MailOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Message = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to fetch messages", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this message?")) return;
    
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages(messages.filter(m => m._id !== id));
        if (selectedMessage?._id === id) setSelectedMessage(null);
      }
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  const handleMarkAsRead = async (msg: Message) => {
    if (msg.read) return;
    try {
      await fetch(`/api/messages/${msg._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
      setMessages(messages.map(m => m._id === msg._id ? { ...m, read: true } : m));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectMessage = (msg: Message) => {
    setSelectedMessage(msg);
    handleMarkAsRead(msg);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Messages</h1>
        <p className="text-secondary">Read and manage contact form submissions.</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
        
        {/* Messages List Sidebar */}
        <div className="w-full md:w-1/3 bg-background border border-border rounded-2xl shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border bg-secondary/5 font-semibold">
            Inbox ({messages.filter(m => !m.read).length} unread)
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-1">
            {isLoading ? (
              <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-accent" /></div>
            ) : messages.length === 0 ? (
              <div className="p-8 text-center text-secondary text-sm">No messages yet.</div>
            ) : (
              messages.map((msg) => (
                <div 
                  key={msg._id}
                  onClick={() => handleSelectMessage(msg)}
                  className={`p-4 rounded-xl cursor-pointer transition-colors border group ${
                    selectedMessage?._id === msg._id 
                      ? "bg-accent/10 border-accent/20" 
                      : msg.read ? "bg-transparent border-transparent hover:bg-secondary/5" : "bg-background border-border shadow-sm hover:bg-secondary/5"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-sm truncate pr-2 ${!msg.read ? "font-bold text-foreground" : "font-medium text-secondary"}`}>
                      {msg.name}
                    </span>
                    <span className="text-xs text-secondary whitespace-nowrap">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={`text-sm truncate mb-1 ${!msg.read ? "font-bold text-foreground" : "font-medium text-foreground"}`}>
                    {msg.subject}
                  </div>
                  <div className="text-xs text-secondary truncate pr-8 relative">
                    {msg.message}
                    <button 
                      onClick={(e) => handleDelete(msg._id, e)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-secondary hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Detail View */}
        <div className="w-full md:w-2/3 bg-background border border-border rounded-2xl shadow-sm flex flex-col overflow-hidden">
          {selectedMessage ? (
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-border flex justify-between items-start bg-secondary/5">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">{selectedMessage.subject}</h2>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-foreground">{selectedMessage.name}</span>
                    <span className="text-secondary text-sm">&lt;{selectedMessage.email}&gt;</span>
                  </div>
                  <div className="text-sm text-secondary">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => handleDelete(selectedMessage._id, e)}
                  className="text-secondary hover:text-danger hover:bg-danger/10"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
              <div className="p-6 flex-1 overflow-y-auto">
                <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                  {selectedMessage.message.split('\n').map((line, i) => (
                    <p key={i} className="text-foreground leading-relaxed">
                      {line || <br />}
                    </p>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-border bg-secondary/5 flex gap-3">
                <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}>
                  <Button className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Reply via Email
                  </Button>
                </a>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-secondary p-8">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <MailOpen className="w-8 h-8 opacity-50" />
              </div>
              <p>Select a message to read</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
