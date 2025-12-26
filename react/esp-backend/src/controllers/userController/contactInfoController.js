import ContactInfo from "../../models/ContactInfo.js";

const createContact = async (req, res) => {
    try {
        const existing = await ContactInfo.findOne({ userId: req.user.id });
        if (existing) return res.status(400).json({ error: "Contact already exists. Use update." });

        const payload = { ...req.body, userId: req.user.id };
        // ensure children is array
        if (typeof payload.children === 'string') {
            payload.children = payload.children.split(',').map(s => s.trim()).filter(Boolean);
        }

        const data = await ContactInfo.create(payload);
        res.status(201).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getContactByUser = async (req, res) => {
    try {
        const data = await ContactInfo.findOne({ userId: req.user.id });
        if (!data) return res.status(404).json({ error: "Contact not found" });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateContactByUser = async (req, res) => {
    try {
        const payload = { ...req.body };
        if (typeof payload.children === 'string') {
            payload.children = payload.children.split(',').map(s => s.trim()).filter(Boolean);
        }

        const updated = await ContactInfo.findOneAndUpdate(
            { userId: req.user.id },
            payload,
            { new: true, runValidators: true }
        );

        if (!updated) return res.status(404).json({ error: "Contact not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export { createContact, getContactByUser, updateContactByUser };
