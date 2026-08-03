'use client';

import { useState } from 'react';
import AdminNav from './AdminNav';
import SignOutButton from './SignOutButton';

export default function AdminSidebar({
  userName,
  userRole,
}: {
  userName?: string | null;
  userRole?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const userInfo = (
    <div className="admin-sidebar-footer">
      <div className="admin-sidebar-user">
        <strong>{userName}</strong>
        {userRole}
      </div>
      <SignOutButton />
    </div>
  );

  return (
    <>
      {/* Desktop: sidebar vertikal, selalu terlihat */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          Warung Coding TV<span>.</span>
          <div style={{ fontSize: 11, color: 'rgba(250,247,242,0.4)', marginTop: 4 }}>
            CRM Admin
          </div>
        </div>
        <AdminNav />
        {userInfo}
      </aside>

      {/* Mobile: topbar + hamburger, menu dropdown di-toggle */}
      <div className="admin-mobile-topbar">
        <div className="admin-sidebar-logo">
          Warung Coding TV<span>.</span>
        </div>
        <button
          className="admin-hamburger"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {menuOpen && (
        <div className="admin-mobile-menu">
          <AdminNav onNavigate={() => setMenuOpen(false)} />
          {userInfo}
        </div>
      )}
    </>
  );
}
