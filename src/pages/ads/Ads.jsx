import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import { useSidebar } from '../../context/SidebarContext';
import './Ads.css';

const adPositions = [
  'Home Page 1',
  'Home Page 2',
  'Receive Whistle',
  'Dashboard Banner',
  'Business Profile',
];

const initialCampaigns = [
  {
    id: 'fest-banner',
    name: 'Fest Banner',
    starts: 'Oct 01, 2023',
    position: 'Home',
    status: 'Running',
    image: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=400&h=220&fit=crop',
    views: '124,000',
    clicks: '6,200',
    ctr: '5.0',
  },
  {
    id: 'beauty-products',
    name: 'Beauty Products',
    starts: 'Oct 01, 2023',
    position: 'Home',
    status: 'Running',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=220&fit=crop',
    views: '124,000',
    clicks: '6,200',
    ctr: '5.0',
  },
  {
    id: 'upgrade-ad',
    name: 'Upgrade Ad',
    starts: 'Oct 01, 2023',
    position: 'Receive Whistle',
    status: 'Paused',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&h=220&fit=crop',
    views: '84,500',
    clicks: '2,100',
    ctr: '2.5',
  },
  {
    id: 'food-restaurant',
    name: 'Food Restaurant',
    starts: 'Oct 01, 2023',
    position: 'Receive Whistle',
    status: 'Paused',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=220&fit=crop',
    views: '84,500',
    clicks: '2,100',
    ctr: '2.5',
  },
];

const emptyForm = {
  name: '',
  position: adPositions[0],
  mediaFile: null,
  mediaPreviewUrl: null,
  redirectUrl: '',
};

const PencilIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 4H4C3.44772 4 3 4.44772 3 5V20C3 20.5523 3.44772 21 4 21H19C19.5523 21 20 20.5523 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PauseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
  </svg>
);

const PlayIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 4L20 12L6 20V4Z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6M19 6V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ImageIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
    <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
    <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function Ads() {
  const { isCollapsed } = useSidebar();
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');

  const runningCount = campaigns.filter((campaign) => campaign.status === 'Running').length;

  const openModal = () => {
    setForm(emptyForm);
    setFormError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormError('');
  };

  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, mediaFile: file, mediaPreviewUrl: previewUrl }));
  };

  const removeMedia = () => {
    if (form.mediaPreviewUrl) {
      URL.revokeObjectURL(form.mediaPreviewUrl);
    }
    setForm((prev) => ({ ...prev, mediaFile: null, mediaPreviewUrl: null }));
  };

  const toggleStatus = (id) => {
    setCampaigns((prev) =>
      prev.map((campaign) =>
        campaign.id === id
          ? { ...campaign, status: campaign.status === 'Running' ? 'Paused' : 'Running' }
          : campaign
      )
    );
  };

  const deleteCampaign = (id) => {
    setCampaigns((prev) => prev.filter((campaign) => campaign.id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedName = form.name.trim();
    if (!trimmedName) {
      setFormError('Please give your campaign a name.');
      return;
    }
    if (!form.mediaPreviewUrl) {
      setFormError('Please upload a PNG or JPEG media file.');
      return;
    }

    const today = new Date();
    const startsLabel = today.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });

    const newCampaign = {
      id: `${trimmedName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      name: trimmedName,
      starts: startsLabel,
      position: form.position,
      status: 'Running',
      image: form.mediaPreviewUrl,
      views: '0',
      clicks: '0',
      ctr: '0.0',
    };

    setCampaigns((prev) => [newCampaign, ...prev]);
    setIsModalOpen(false);
    setForm(emptyForm);
    setFormError('');
  };

  return (
    <div className="page-main-container">
      <Sidebar />
      <div className={`page-inner-container ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        <Navbar />
        <div className="page-content">
          <section className="ads-section">
            <div className="ads-page-header">
              <h1>Active Ads</h1>
              <button type="button" className="add-campaign-button" onClick={openModal}>
                <PlusIcon />
                Add New Campaign
              </button>
            </div>

            <p className="ads-campaign-count">
              Total running campaigns : <span>{runningCount}</span>
            </p>

            <div className="ads-grid">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="ad-card">
                  <div className="ad-preview">
                    <img src={campaign.image} alt={campaign.name} />
                    <span className="ad-preview-label">Ad Preview</span>
                    <div className="ad-preview-actions">
                      <span className={`status-pill ${campaign.status === 'Running' ? 'status-pill--running' : 'status-pill--paused'}`}>
                        {campaign.status}
                      </span>
                      <button type="button" className="ad-icon-button" aria-label={`Edit ${campaign.name}`}>
                        <PencilIcon />
                      </button>
                      <button
                        type="button"
                        className="ad-icon-button"
                        aria-label={campaign.status === 'Running' ? 'Pause campaign' : 'Resume campaign'}
                        onClick={() => toggleStatus(campaign.id)}
                      >
                        {campaign.status === 'Running' ? <PauseIcon /> : <PlayIcon />}
                      </button>
                      <button
                        type="button"
                        className="ad-icon-button ad-icon-button--danger"
                        aria-label={`Delete ${campaign.name}`}
                        onClick={() => deleteCampaign(campaign.id)}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>

                  <div className="ad-card-body">
                    <h2>{campaign.name}</h2>
                    <p className="ad-card-meta">
                      Starts: <span className="meta-mono">{campaign.starts}</span> • Position:{' '}
                      <span className="meta-link">{campaign.position}</span>
                    </p>

                    <div className="ad-metrics-bar">
                      <span className="metrics-label">Performance Metrics</span>
                      <div className="metrics-values">
                        <div className="metric-item">
                          <span className="metric-label">VIEWS</span>
                          <span className="metric-value">{campaign.views}</span>
                        </div>
                        <div className="metric-item">
                          <span className="metric-label">CLICKS</span>
                          <span className="metric-value">{campaign.clicks}</span>
                        </div>
                        <div className="metric-item">
                          <span className="metric-label">CTR</span>
                          <span className="metric-value metric-value--ctr">{campaign.ctr}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {isModalOpen && (
        <div className="ads-modal-overlay" onClick={closeModal}>
          <div className="ads-modal" onClick={(event) => event.stopPropagation()}>
            <div className="ads-modal-header">
              <h2>New Ad/Campaign</h2>
              <button type="button" className="modal-close-button" onClick={closeModal} aria-label="Close">
                <CloseIcon />
              </button>
            </div>

            <form className="ads-modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="ad-name">Ad Name</label>
                <input
                  id="ad-name"
                  type="text"
                  placeholder="e.g. Silly Horn Accent"
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                />
              </div>

              <div className="form-group">
                <label htmlFor="ad-position">Ad Position</label>
                <div className="select-wrapper">
                  <select
                    id="ad-position"
                    value={form.position}
                    onChange={(event) => setForm((prev) => ({ ...prev, position: event.target.value }))}
                  >
                    {adPositions.map((position) => (
                      <option key={position} value={position}>
                        {position}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon />
                </div>
              </div>

              <div className="form-group">
                <label>Media File</label>
                {form.mediaPreviewUrl ? (
                  <div className="media-preview-row">
                    <img src={form.mediaPreviewUrl} alt="Selected media" className="media-preview-thumb" />
                    <button type="button" className="media-remove-button" onClick={removeMedia} aria-label="Remove media">
                      <CloseIcon />
                    </button>
                  </div>
                ) : (
                  <label className="media-dropzone" htmlFor="ad-media">
                    <ImageIcon />
                    <span>Upload PNG/JPEG File</span>
                    <small>Recommended Size: 250x120 px</small>
                  </label>
                )}
                <input
                  id="ad-media"
                  type="file"
                  accept="image/png, image/jpeg"
                  className="file-input-hidden"
                  onChange={handleFileChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="ad-redirect">Redirect URL</label>
                <input
                  id="ad-redirect"
                  type="text"
                  placeholder="https://example.com"
                  value={form.redirectUrl}
                  onChange={(event) => setForm((prev) => ({ ...prev, redirectUrl: event.target.value }))}
                />
              </div>

              {formError && <p className="form-error">{formError}</p>}

              <div className="ads-modal-actions">
                <button type="button" className="modal-button modal-button--cancel" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="modal-button modal-button--upload">
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ads;