<script>
    /** @type {{ registered?: boolean, onchange?: (value: boolean) => void }} */
    let { registered = $bindable(false), onchange = () => {} } = $props();
  
    function toggle() {
      registered = !registered;
      onchange(registered);
    }
  </script>
  
  <div class="toggle-row mb-5">
    <label id="fRegisteredToggle" class="font-sans font-normal cursor-pointer" style="font-size:13.5px;">
      Yes, I am a registered real estate company
    </label>
    <button
      type="button"
      class="switch"
      class:on={registered}
      role="switch"
      aria-checked={registered}
      aria-labelledby="fRegisteredToggle"
      onclick={toggle}
    ></button>
  </div>
  
  <style>
    .toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: #ffffff;
      border: 1.5px solid #EDE7DC;
      border-radius: 14px;
      padding: 14px 16px;
      transition: background 0.3s, border-color 0.3s;
    }
    :global([data-theme='dark']) .toggle-row {
      background: #1A2438;
      border-color: rgba(255, 255, 255, 0.1);
    }
  
    .switch {
      width: 40px;
      height: 23px;
      border-radius: 40px;
      border: none;
      cursor: pointer;
      background: #D8CEBC;
      position: relative;
      flex-shrink: 0;
      transition: background 0.22s ease;
    }
    .switch::after {
      content: '';
      position: absolute;
      top: 2.5px;
      left: 2.5px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
      transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .switch.on {
      background: #4A7848;
    }
    .switch.on::after {
      transform: translateX(17px);
    }
    :global([data-theme='dark']) .switch {
      background: rgba(255, 255, 255, 0.15);
    }
</style>