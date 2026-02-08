import { useState } from "react";
import React from 'react';

type ConsultationModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
    if (!isOpen) return null;

    const [formData, setFormData] = useState<{
        orgName: string;
        email: string;
        needs: string;
    }>({
        orgName: "",
        email: "",
        needs: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Consultation Request: ${formData.orgName}`);
        const body = encodeURIComponent(
            `Organization: ${formData.orgName}\nEmail: ${formData.email}\nNeeds: ${formData.needs}`
        );
        window.location.href = `mailto:support@philanthroforge.com?subject=${subject}&body=${body}`;
        onClose();
        alert("Request prepared! Please send the email.");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold mb-2">Let PhilanthroForge Build It</h2>
                <p className="text-gray-600 mb-6 text-sm">
                    We offer free consultation for registered non-profits. Tell us what you need.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Organization Name
                        </label>
                        <input
                            required
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            value={formData.orgName}
                            onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            required
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Project Needs
                        </label>
                        <textarea
                            required
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            value={formData.needs}
                            onChange={(e) => setFormData({ ...formData, needs: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
                    >
                        Request Call
                    </button>
                </form>
            </div>
        </div>
    );
}
