import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const ContactInfo = () => {
  const { token, loading } = useSelector((state) => state.auth);
  
  const [form, setForm] = useState({ fatherName: '', motherName: '', children: '', gender: '' });
  const [existing, setExisting] = useState(null);
  const [saving, setSaving] = useState(false);

  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/contact/getContact', config);
        if (res.data) {
          setExisting(res.data);
          setForm({
            fatherName: res.data.fatherName || '',
            motherName: res.data.motherName || '',
            children: (res.data.children || []).join(', '),
            gender: res.data.gender || ''
          });
        }
      } catch (err) {
        // not found is ok
      }
    };
    if (token) fetch();
  }, [token]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      // send children as array
      if (typeof payload.children === 'string') {
        payload.children = payload.children.split(',').map(s => s.trim()).filter(Boolean);
      }

      if (existing) {
        const res = await axios.put('http://localhost:5000/api/contact/updateContact', payload, config);
        setExisting(res.data);
        alert('Contact updated');
      } else {
        const res = await axios.post('http://localhost:5000/api/contact/createContact', payload, config);
        setExisting(res.data);
        alert('Contact created');
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Error saving contact');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <input name="fatherName" placeholder="Father Name" value={form.fatherName} onChange={handleChange} className="border p-2 w-full" />
        <input name="motherName" placeholder="Mother Name" value={form.motherName} onChange={handleChange} className="border p-2 w-full" />
        <input name="children" placeholder="Children (comma separated)" value={form.children} onChange={handleChange} className="border p-2 w-full" />
        <select name="gender" value={form.gender} onChange={handleChange} className="border p-2 w-full">
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded">
          {existing ? 'Update Contact' : 'Create Contact'}
        </button>
      </form>

      {existing && (
        <div className="mt-6">
          <h3 className="font-semibold">Saved Contact</h3>
          <p><strong>Father:</strong> {existing.fatherName}</p>
          <p><strong>Mother:</strong> {existing.motherName}</p>
          <p><strong>Children:</strong> {(existing.children || []).join(', ')}</p>
          <p><strong>Gender:</strong> {existing.gender}</p>
        </div>
      )}
    </div>
  )
}

export default ContactInfo
