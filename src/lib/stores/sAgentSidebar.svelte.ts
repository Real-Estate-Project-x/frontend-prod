function handleSubAgentSidebarStore() {
  let open = $state(false);

  function toggle() {
    open = !open;
  }

  function close() {
    open = false;
  }

  return {
    get open() {
      return open;
    },
    close,
    toggle,
  };
}

export const subAgentSidebarStore = handleSubAgentSidebarStore();
