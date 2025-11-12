"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  EnvelopeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: "unread" | "read" | "replied";
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const [filter, setFilter] = useState<"all" | "unread" | "read" | "replied">(
    "all"
  );
  const router = useRouter();

  const fetchMessages = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/messages");

      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        toast.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to fetch messages");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (!response.ok) {
          router.push("/admin");
          return;
        }
        await fetchMessages();
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/admin");
      }
    };

    checkAuth();
  }, [router, fetchMessages]);

  const updateMessageStatus = async (
    messageId: string,
    status: ContactMessage["status"]
  ) => {
    try {
      const response = await fetch("/api/messages", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: messageId, status }),
      });

      if (response.ok) {
        toast.success("Message status updated");
        await fetchMessages();
        if (selectedMessage?.id === messageId) {
          setSelectedMessage({ ...selectedMessage, status });
        }
      } else {
        toast.error("Failed to update message status");
      }
    } catch (error) {
      console.error("Error updating message:", error);
      toast.error("Failed to update message status");
    }
  };

  const getStatusColor = (status: ContactMessage["status"]) => {
    switch (status) {
      case "unread":
        return "bg-red-100 text-red-800";
      case "read":
        return "bg-yellow-100 text-yellow-800";
      case "replied":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredMessages = messages.filter((message) => {
    if (filter === "all") return true;
    return message.status === filter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <AdminSidebar>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </AdminSidebar>
    );
  }

  return (
    <AdminSidebar>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Messages</h1>
            <p className="text-muted-foreground mt-2">
              Manage contact form submissions
            </p>
          </div>

          <div className="flex space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Messages List */}
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`bg-card border rounded-lg p-4 cursor-pointer transition-colors hover:bg-accent ${
                  selectedMessage?.id === message.id
                    ? "ring-2 ring-primary"
                    : ""
                } ${
                  message.status === "unread"
                    ? "border-l-4 border-l-red-500"
                    : ""
                }`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-foreground">
                    {message.name}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      message.status
                    )}`}
                  >
                    {message.status}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-2">
                  {message.email}
                </p>

                {message.subject && (
                  <p className="text-sm font-medium text-foreground mb-2">
                    Subject: {message.subject}
                  </p>
                )}

                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {message.message}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="h-3 w-3" />
                    <span>{formatDate(message.created_at)}</span>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateMessageStatus(
                          message.id,
                          message.status === "read" ? "unread" : "read"
                        );
                      }}
                      className="text-blue-600 hover:text-blue-800"
                      title={
                        message.status === "read"
                          ? "Mark as unread"
                          : "Mark as read"
                      }
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateMessageStatus(message.id, "replied");
                      }}
                      className="text-green-600 hover:text-green-800"
                      title="Mark as replied"
                    >
                      <CheckIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredMessages.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <EnvelopeIcon className="mx-auto h-12 w-12" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No messages found
                </h3>
                <p className="text-gray-500">
                  {filter === "all"
                    ? "No contact messages have been received yet."
                    : `No ${filter} messages found.`}
                </p>
              </div>
            )}
          </div>

          {/* Message Detail */}
          {selectedMessage && (
            <div className="bg-card border rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-foreground">
                  Message Details
                </h2>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    From
                  </label>
                  <p className="text-sm text-muted-foreground">
                    {selectedMessage.name} ({selectedMessage.email})
                  </p>
                </div>

                {selectedMessage.subject && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Subject
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {selectedMessage.subject}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Message
                  </label>
                  <div className="bg-muted p-3 rounded-md">
                    <p className="text-sm text-foreground whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Received
                  </label>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(selectedMessage.created_at)}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Status
                  </label>
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      selectedMessage.status
                    )}`}
                  >
                    {selectedMessage.status}
                  </span>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={() =>
                      updateMessageStatus(selectedMessage.id, "read")
                    }
                    variant="outline"
                    size="sm"
                    disabled={selectedMessage.status === "read"}
                  >
                    Mark as Read
                  </Button>

                  <Button
                    onClick={() =>
                      updateMessageStatus(selectedMessage.id, "replied")
                    }
                    variant="outline"
                    size="sm"
                    disabled={selectedMessage.status === "replied"}
                  >
                    Mark as Replied
                  </Button>

                  <Button
                    onClick={() => {
                      // Sanitize email to prevent open redirect
                      const sanitizedEmail =
                        selectedMessage.email?.replace(/[<>]/g, "") || "";
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                      if (emailRegex.test(sanitizedEmail)) {
                        window.location.href = `mailto:${encodeURIComponent(
                          sanitizedEmail
                        )}?subject=${encodeURIComponent(
                          `Re: ${selectedMessage.subject || "Your message"}`
                        )}`;
                      }
                    }}
                    size="sm"
                  >
                    Reply via Email
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminSidebar>
  );
}
