document.addEventListener('DOMContentLoaded', () => {
    // --- Command descriptions popup logic ---
    const commandInfo = {
        help: {
            title: "@F2K help",
            desc: "Shows all available commands and usage information."
        },
        set: {
            title: "@F2K set",
            desc: "To receive alerts on beta keys and free to keep goodies, set up a channel."
        },
        setrole: {
            title: "@F2K setrole",
            desc: "Assign a role to receive pings."
        },
        info: {
            title: "@F2K info",
            desc: "Verify that the setup procedure was completed correctly."
        },
        stop: {
            title: "@F2K stop",
            desc: "Turn off the alerts for beta keys, loot, and free-to-keep games."
        },
        list: {
            title: "@F2K list",
            desc: "Get a list of free games."
        }
    };

    const list = document.getElementById('commands-list');
    const descBox = document.getElementById('command-desc');
    const cmdTitle = document.getElementById('cmd-title');
    const cmdDesc = document.getElementById('cmd-desc');
    const closeBtn = document.getElementById('cmd-close');

    if (list) {
        list.addEventListener('click', e => {
            const li = e.target.closest('li[data-cmd]');
            if (!li) return;
            const cmd = li.getAttribute('data-cmd');
            if (commandInfo[cmd]) {
                cmdTitle.textContent = commandInfo[cmd].title;
                cmdDesc.innerHTML = commandInfo[cmd].desc;
                descBox.style.display = 'block';
            }
        });
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            descBox.style.display = 'none';
        });
    }
});