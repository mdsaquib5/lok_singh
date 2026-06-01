"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import ImageExtension from '@tiptap/extension-image';
import { FiBold, FiItalic, FiUnderline, FiImage, FiLink, FiList, FiCheck, FiX, FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import NextLink from 'next/link';
import "./blog-editor.css";

const extensions = [
  StarterKit,
  Underline,
  LinkExtension.configure({ openOnClick: false }),
  ImageExtension,
];

export default function BlogEditor({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    status: initialData?.status || 'draft',
    authorName: initialData ? 'Lokbhadra Singh' : '',
    authorAvatar: initialData?.author?.avatarUrl || '',
    coverImage: initialData?.coverImage || null,
  });

  const editor = useEditor({
    extensions,
    content: initialData?.content || '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "tiptapEditor"
      }
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('folder', 'portfolio_cms/covers');

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: data });
      const uploaded = await res.json();
      if (res.ok) {
        setFormData(prev => ({
          ...prev,
          coverImage: { url: uploaded.url, publicId: uploaded.publicId }
        }));
      } else {
        alert(uploaded.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditorImageUpload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,application/pdf';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setLoading(true);
      const data = new FormData();
      data.append('file', file);
      data.append('folder', 'portfolio_cms/inline');

      try {
        const res = await fetch('/api/upload', { method: 'POST', body: data });
        const uploaded = await res.json();
        if (res.ok) {
          if (uploaded.resourceType === 'raw' || uploaded.format === 'pdf') {
            // It's a PDF, insert a link
            editor.chain().focus().insertContent(`<a href="${uploaded.url}" target="_blank" class="pdf-download">📄 Download PDF (${file.name})</a>`).run();
          } else {
            editor.chain().focus().setImage({ src: uploaded.url }).run();
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    input.click();
  };

  const addLink = () => {
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const savePost = async () => {
    if (!formData.title) return alert('Title is required');

    setLoading(true);

    const payload = {
      title: formData.title,
      excerpt: '',
      content: editor.getHTML(),
      status: formData.status,
      author: { name: formData.authorName, avatarUrl: formData.authorAvatar },
      tags: [],
      coverImage: formData.coverImage,
    };

    try {
      const method = initialData ? 'PUT' : 'POST';
      const url = initialData ? `/api/blogs/${initialData.slug}` : '/api/blogs';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        router.push('/admin/blogs');
        router.refresh();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/${initialData.slug}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/admin/blogs');
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="blog-editor-header">
        <NextLink href="/admin/blogs" className="backLink">
          <FiArrowLeft /> Back to Blogs
        </NextLink>
      </div>

      <div className="grid">
        <div className="mainCol">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="titleInput"
            placeholder="Post Title..."
          />

          <div className="editorToolbar">
            <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor?.isActive('bold') ? "active" : ''}><FiBold /></button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor?.isActive('italic') ? "active" : ''}><FiItalic /></button>
            <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor?.isActive('underline') ? "active" : ''}><FiUnderline /></button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor?.isActive('heading', { level: 2 }) ? "active" : ''}>H2</button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor?.isActive('heading', { level: 3 }) ? "active" : ''}>H3</button>
            <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor?.isActive('bulletList') ? "active" : ''}><FiList /></button>
            <button onClick={addLink} className={editor?.isActive('link') ? "active" : ''}><FiLink /></button>
            <button onClick={handleEditorImageUpload}><FiImage /></button>
          </div>

          <div className="editorContentWrapper">
            <EditorContent editor={editor} />
          </div>
        </div>

        <div className="sideCol">
          <div className="card">
            <h3>Publishing</h3>
            <div className="inputGroup">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="input">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div className="card">
            <h3>Cover Image</h3>
            {formData.coverImage?.url ? (
              <div className="coverPreview">
                <img src={formData.coverImage.url} alt="Cover" />
                <button onClick={() => setFormData(prev => ({ ...prev, coverImage: null }))} className="removeCoverBtn">
                  <FiX /> Remove
                </button>
              </div>
            ) : (
              <label className="uploadZone">
                <FiImage />
                <span>Upload Cover Image</span>
                <input type="file" accept="image/*" onChange={handleCoverUpload} hidden />
              </label>
            )}
          </div>



          <div className="card">
            <h3>Author</h3>
            <div className="inputGroup">
              <label>Name</label>
              <input type="text" name="authorName" value={formData.authorName} onChange={handleChange} className="input" />
            </div>
          </div>
        </div>
      </div>

      <div className="blog-editor-footer">
        <div className="actions">
          <button className="btnSave" onClick={savePost} disabled={loading}>
            {loading ? 'Saving...' : 'Save Post'}
          </button>
          {initialData && (
            <button className="btnDelete" onClick={deletePost} disabled={loading}>
              <FiTrash2 /> Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
