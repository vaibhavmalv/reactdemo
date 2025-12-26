"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createContact, updateContact } from "@/store/user/userThunks";

export default function ContactUs() {
    const dispatch = useDispatch();
    const { contact, contactLoading } = useSelector(state => state.user);

    const [formData, setFormData] = useState({
        fatherName: "",
        motherName: "",
        children: "",
        gender: ""
    });

    useEffect(() => {
        if (!contact) return;

        setFormData({
            fatherName: contact.fatherName || "",
            motherName: contact.motherName || "",
            children: Array.isArray(contact.children)
                ? contact.children.join(", ")
                : "",
            gender: contact.gender || ""
        });
    }, [contact]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            children: formData.children
                .split(",")
                .map(c => c.trim())
                .filter(Boolean)
        };

        try {
            contact
                ? await dispatch(updateContact(payload)).unwrap()
                : await dispatch(createContact(payload)).unwrap();

            alert(contact ? "Contact updated" : "Contact created");
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    return (
        <div className=" bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                    Contact Information
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                    Please fill in your family details
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="fatherName"
                        placeholder="Father's Name"
                        value={formData.fatherName}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm
                                   focus:outline-none focus:ring-2 focus:ring-blue-500
                                   transition"
                    />

                    <input
                        name="motherName"
                        placeholder="Mother's Name"
                        value={formData.motherName}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm
                                   focus:outline-none focus:ring-2 focus:ring-blue-500
                                   transition"
                    />

                    <input
                        name="children"
                        placeholder="Children (comma separated)"
                        value={formData.children}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm
                                   focus:outline-none focus:ring-2 focus:ring-blue-500
                                   transition"
                    />

                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm
                                   bg-white focus:outline-none focus:ring-2 focus:ring-blue-500
                                   transition"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>

                    <button
                        type="submit"
                        disabled={contactLoading}
                        className={`w-full py-3 rounded-xl text-sm font-semibold text-white
                            transition-all duration-200
                            ${contactLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-blue-700 active:scale-[0.98]"}
                        `}
                    >
                        {contactLoading
                            ? "Saving..."
                            : contact
                                ? "Update Contact"
                                : "Create Contact"}
                    </button>
                </form>
            </div>
        </div>
    );
}
