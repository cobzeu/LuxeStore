'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddProduct() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        salePrice: '',
        category: '',
        image: '',
        sizes: '',
        colors: '',
        inStock: true
    });

    useEffect(() => {
        if (localStorage.getItem('luxe_admin_token') !== 'authenticated') {
            router.push('/luxeadmin');
            return;
        }

        loadCategories();
    }, [router]);

    const loadCategories = async () => {
        try {
            const response = await fetch('/api/admin/categories');
            const data = await response.json();
            if (data.success) {
                setCategories(data.categories || []);
            }
        } catch (error) {
            console.error('Failed to load categories:', error);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);

        // Upload to Supabase
        setUploading(true);
        try {
            const uploadFormData = new FormData();
            uploadFormData.append('file', file);

            const response = await fetch('/api/admin/upload-image', {
                method: 'POST',
                body: uploadFormData
            });

            const data = await response.json();

            if (data.success) {
                setFormData({ ...formData, image: data.url });
            } else {
                alert('Failed to upload image: ' + data.error);
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image');
        }
        setUploading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const productData = {
                name: formData.name,
                description: formData.description,
                price: Number(formData.price),
                salePrice: formData.salePrice ? Number(formData.salePrice) : null,
                category: formData.category,
                image: formData.image,
                sizes: formData.sizes ? formData.sizes.split(',').map(s => s.trim()) : [],
                colors: formData.colors ? formData.colors.split(',').map(c => c.trim()) : [],
                inStock: formData.inStock
            };

            const response = await fetch('/api/admin/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });

            const data = await response.json();

            if (data.success) {
                alert('Product added successfully!');
                router.push('/luxeadmin/dashboard');
            } else {
                alert('Failed to add product: ' + data.error);
            }
        } catch (error) {
            console.error('Failed to add product:', error);
            alert('Failed to add product');
        }

        setLoading(false);
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <div className="admin-header-content">
                    <h1>Add New Product</h1>
                    <Link href="/luxeadmin/dashboard" className="btn btn-outline btn-sm">
                        Back to Dashboard
                    </Link>
                </div>
            </div>

            <div className="admin-form-container">
                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="name">Product Name *</label>
                            <input
                                type="text"
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g., Premium Cotton Shirt"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="category">Category *</label>
                            <select
                                id="category"
                                required
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                                <option value="Women">Women</option>
                                <option value="Men">Men</option>
                                <option value="Shawls">Shawls</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Price (Rs.) *</label>
                            <input
                                type="number"
                                id="price"
                                required
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                placeholder="2500"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="salePrice">Sale Price (Rs.)</label>
                            <input
                                type="number"
                                id="salePrice"
                                value={formData.salePrice}
                                onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                                placeholder="1999"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Product Image *</label>
                        <div className="image-upload-section">
                            <input
                                type="file"
                                id="imageFile"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="imageFile" className="upload-button">
                                {uploading ? 'Uploading...' : '📁 Choose Image File'}
                            </label>
                            <span style={{ margin: '0 10px', color: 'var(--color-text-muted)' }}>OR</span>
                            <input
                                type="url"
                                id="image"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="Paste image URL"
                                style={{ flex: 1 }}
                            />
                        </div>
                        {imagePreview && (
                            <div className="image-preview">
                                <img src={imagePreview} alt="Preview" />
                            </div>
                        )}
                        <small>Upload a file or paste an image URL</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            required
                            rows="4"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Detailed product description..."
                        />
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="sizes">Available Sizes</label>
                            <input
                                type="text"
                                id="sizes"
                                value={formData.sizes}
                                onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                                placeholder="S, M, L, XL (comma-separated)"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="colors">Available Colors</label>
                            <input
                                type="text"
                                id="colors"
                                value={formData.colors}
                                onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                                placeholder="Black, White, Blue (comma-separated)"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={formData.inStock}
                                onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                            />
                            <span style={{ marginLeft: '10px' }}>In Stock</span>
                        </label>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Adding Product...' : 'Add Product'}
                        </button>
                        <Link href="/luxeadmin/dashboard" className="btn btn-outline">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>

            <style jsx>{`
                .admin-page {
                    min-height: 100vh;
                    background: var(--color-background);
                }

                .admin-header {
                    background: var(--color-surface);
                    border-bottom: 1px solid var(--color-border);
                    padding: 20px 0;
                }

                .admin-header-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .admin-header h1 {
                    color: var(--color-primary);
                    margin: 0;
                }

                .admin-form-container {
                    max-width: 1200px;
                    margin: 40px auto;
                    padding: 0 20px;
                }

                .product-form {
                    background: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-lg);
                    padding: 30px;
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin-bottom: 20px;
                }

                .form-group {
                    margin-bottom: 20px;
                }

                .form-group label {
                    display: block;
                    color: var(--color-text);
                    font-weight: 500;
                    margin-bottom: 8px;
                }

                .form-group input,
                .form-group select,
                .form-group textarea {
                    width: 100%;
                    padding: 12px;
                    background: var(--color-background);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-md);
                    color: var(--color-text);
                    font-size: 14px;
                }

                .form-group input:focus,
                .form-group select:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: var(--color-primary);
                }

                .form-group small {
                    display: block;
                    margin-top: 5px;
                    color: var(--color-text-muted);
                    font-size: 12px;
                }

                .image-upload-section {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .upload-button {
                    padding: 12px 20px;
                    background: var(--color-primary);
                    color: var(--color-text-dark);
                    border-radius: var(--radius-md);
                    cursor: pointer;
                    font-weight: 500;
                    transition: all var(--transition-fast);
                    white-space: nowrap;
                }

                .upload-button:hover {
                    opacity: 0.9;
                }

                .image-preview {
                    margin-top: 15px;
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-md);
                    overflow: hidden;
                    max-width: 300px;
                }

                .image-preview img {
                    width: 100%;
                    height: auto;
                    display: block;
                }

                .form-actions {
                    display: flex;
                    gap: 15px;
                    margin-top: 30px;
                }
            `}</style>
        </div>
    );
}
