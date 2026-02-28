import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { propertiesAPI } from '../services/api'
import { Upload, AlertCircle, Loader, X } from 'lucide-react'

export default function AddPropertyPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'apartment',
    location: '',
    price: '',
    area: '',
    amenities: [],
    thumbnail: null,
    images: [],
  })
  const [thumbnailPreview, setThumbnailPreview] = useState(null)
  const [imagesPreview, setImagesPreview] = useState([])

  const amenitiesOptions = ['parking', 'pool', 'gym', 'garden', 'security', 'elevator']

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleAmenityToggle = (amenity) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.includes(amenity)
        ? formData.amenities.filter(a => a !== amenity)
        : [...formData.amenities, amenity],
    })
  }

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, thumbnail: file })
      const reader = new FileReader()
      reader.onloadend = () => setThumbnailPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleImagesChange = (e) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files)
      setFormData({ ...formData, images: [...formData.images, ...newImages] })

      // Generate previews
      newImages.forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagesPreview(prev => [...prev, reader.result])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    })
    setImagesPreview(imagesPreview.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (!formData.title || !formData.description || !formData.price || !formData.area) {
        setError('Please fill in all required fields')
        setLoading(false)
        return
      }

      if (!formData.thumbnail) {
        setError('Please upload a thumbnail image')
        setLoading(false)
        return
      }

      if (formData.images.length === 0) {
        setError('Please upload at least one property image')
        setLoading(false)
        return
      }

      await propertiesAPI.create(formData)
      setSuccess('Property listed successfully!')
      setTimeout(() => navigate('/properties'), 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create property. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-12">
      <div className="container max-w-2xl">
        <h1 className="text-4xl font-bold mb-2">List Your Property</h1>
        <p className="text-gray-600 mb-8">
          Fill in the details below to list your property on EstateScout
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            {success}
          </div>
        )}

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="input-field"
                placeholder="e.g., Beautiful Apartment in Downtown"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="input-field resize-none"
                rows="4"
                placeholder="Describe your property in detail..."
                required
              />
            </div>

            {/* Grid Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="studio">Studio</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="office">Office</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="e.g., Downtown, Manhattan"
                  required
                />
              </div>
            </div>

            {/* Grid Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="500000"
                  required
                />
              </div>

              {/* Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area (m²) *
                </label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="150"
                  required
                />
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Amenities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {amenitiesOptions.map(amenity => (
                  <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="w-4 h-4"
                    />
                    <span className="capitalize">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thumbnail Image *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                {thumbnailPreview ? (
                  <div className="relative">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, thumbnail: null })
                        setThumbnailPreview(null)
                      }}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center">
                    <Upload size={40} className="text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-700">
                      Click to upload thumbnail
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Images Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Images (Max 5) *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                {imagesPreview.length > 0 ? (
                  <div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      {imagesPreview.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                    {imagesPreview.length < 5 && (
                      <label className="cursor-pointer inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                        <span>+ Add more images</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImagesChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center">
                    <Upload size={40} className="text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-700">
                      Click to upload images
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImagesChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading && <Loader size={20} className="animate-spin" />}
              <span>{loading ? 'Listing Property...' : 'List Property'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
