<script>
   /** @type {{ onClick: () => void }} */
   let { onClick = () => {} } = $props();
</script>
  
  <button onclick={onClick} class="btn-social" type="button">
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
    Continue with Google
</button>

<style>
    /* ── Social buttons ── */
    .btn-social {
      width: 100%; background: #ffffff; border: 1.5px solid #EDE7DC; border-radius: 12px;
      padding: 12px 16px;
      font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 0.03em; color: #0A2463;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 10px;
      transition: border-color 0.2s, background 0.2s, box-shadow 0.2s, transform 0.15s;
    }
    .btn-social:hover {
      border-color: rgba(74,144,226,0.45); background: #F7F3EC;
      box-shadow: 0 4px 18px rgba(10,36,99,0.07); transform: translateY(-1px);
    }
    :global([data-theme="dark"]) .btn-social { background: #1A2438; border-color: rgba(255,255,255,0.09); color: #E8EDF5; }
    :global([data-theme="dark"]) .btn-social:hover { background: #1F2D45; border-color: rgba(74,144,226,0.40); box-shadow: 0 4px 18px rgba(0,0,0,0.32); }
  </style>