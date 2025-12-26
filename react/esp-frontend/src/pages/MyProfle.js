import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const MyProfle = () => {
  const { token, loading } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ firstName: '', lastName: '', phoneNumber: '', address: '' });
  const [existing, setExisting] = useState(null);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/userinfo/getProfile', config);
        if (res.data) {
          setExisting(res.data);
          setForm({
            firstName: res.data.firstName || '',
            lastName: res.data.lastName || '',
            phoneNumber: res.data.phoneNumber || '',
            address: res.data.address || ''
            ,
            image: res.data.image || '',
            imageMime: res.data.imageMime || ''
          });
          if (res.data.image && res.data.imageMime) {
            setImagePreview(`data:${res.data.imageMime};base64,${res.data.image}`);
          }
        }
      } catch (err) {
        // not found is fine
        // console.error(err.response?.data || err.message);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    // limit file size to 2MB
    if (file.size > 2 * 1024 * 1024) {
      alert('File too large (max 2MB)');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      // dataUrl is like 'data:image/png;base64,AAA...'
      const base64 = dataUrl.split(',')[1];
      setForm({ ...form, image: base64, imageMime: file.type });
      setImagePreview(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (existing) {
        const res = await axios.put('http://localhost:5000/api/userinfo/updateProfile', form, config);
        setExisting(res.data);
        alert('Profile updated');
      } else {
        const res = await axios.post('http://localhost:5000/api/userinfo/createProfile', form, config);
        setExisting(res.data);
        alert('Profile created');
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Error saving profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} className="border p-2 w-full" required />
        <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className="border p-2 w-full" required />
        <input name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} className="border p-2 w-full" />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} className="border p-2 w-full" />
        <div>
          <label className="block mb-1">Profile Image (optional)</label>
          <input type="file" accept="image/*" onChange={handleFile} />
          {imagePreview && (
            <img src={imagePreview} alt="preview" className="mt-2 w-32 h-32 object-cover border" />
          )}
        </div>
        <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded">
          {existing ? 'Update Profile' : 'Create Profile'}
        </button>
      </form>

      {existing && (
        <div className="mt-6">
          <h3 className="font-semibold">Saved Profile</h3>
          <p><strong>First:</strong> {existing.firstName}</p>
          <p><strong>Last:</strong> {existing.lastName}</p>
          <p><strong>Phone:</strong> {existing.phoneNumber}</p>
          <p><strong>Address:</strong> {existing.address}</p>
          {existing.image && existing.imageMime && (
            <div className="mt-2">
              <img src={`data:${existing.imageMime};base64,${existing.image}`} alt="profile" className="w-40 h-40 object-cover border" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MyProfle
