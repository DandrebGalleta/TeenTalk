const postTextarea = document.querySelector('.start-discussion textarea');
const postButton = document.querySelector('.start-discussion .post-btn');
const feedContent = document.getElementById('feedContent');
const noPostsMessage = document.querySelector('.no-posts');
const profileDropdownTrigger = document.getElementById('profileDropdownTrigger');
const profileMenu = document.getElementById('profileMenu');
const profileMoodDisplay = document.querySelector('.profile-box .mood');
let moodOptions = [];


function createPostElement(content) {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const postHTML = `
        <div class="post-card">
            <div class="post-header">
                <img src="images/pfp.png" class="pfp-sm">
                <span class="username">You</span>
                <span class="timestamp">${timeString}</span>
                <button class="support-btn">Support</button>
                <span class="more-options">...</span> 
            </div>
            <div class="post-content">
                ${content.replace(/\n/g, '<br>')}
            </div>
            <div class="post-tags">
                <span class="tag-item">#MyPost</span>
            </div>
            <div class="post-footer">
                <div class="post-stats">
                    <span data-likes="0">❤️ 0 Likes</span>
                    <span data-replies="0">💬 0 Replies</span>
                    <span>👀 1 View</span>
                </div>
                <div class="post-actions">
                    <button class="like-btn">❤️</button>
                    <button class="reply-btn">💬</button>
                </div>
            </div>
        </div>
    `;
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = postHTML.trim();
    return tempDiv.firstChild;
}

postButton.addEventListener('click', () => {
    const content = postTextarea.value.trim();

    if (content) {
        const newPost = createPostElement(content);
        
        if (noPostsMessage) {
            noPostsMessage.style.display = 'none';
        }

        feedContent.prepend(newPost);

        postTextarea.value = '';

        attachSupportListener(newPost);
    }
});


function attachSupportListener(postElement) {
    const supportButton = postElement.querySelector('.support-btn');
    if (supportButton) {
        supportButton.addEventListener('click', (event) => {
            const btn = event.currentTarget;
            
            if (!btn.classList.contains('supported')) {
                btn.classList.add('supported');
                btn.textContent = 'Supported';
            }
        });
    }
}

document.querySelectorAll('.post-card').forEach(attachSupportListener);


feedContent.addEventListener('click', (event) => {
    const likeBtn = event.target.closest('.like-btn');
    if (likeBtn) {
        const postStats = likeBtn.closest('.post-footer').querySelector('.post-stats');
        const likesSpan = postStats.querySelector('span[data-likes]');
        
        let currentLikes = parseInt(likesSpan.dataset.likes, 10);
        
        if (!likeBtn.classList.contains('liked')) {
            currentLikes++;
            likeBtn.classList.add('liked');
            likeBtn.style.color = '#ff3838';
        } else {
            currentLikes--;
            likeBtn.classList.remove('liked');
            likeBtn.style.color = '#555';
        }
        
        likesSpan.dataset.likes = currentLikes;
        likesSpan.textContent = `❤️ ${currentLikes} Likes`;
        return; 
    }
    
    const replyBtn = event.target.closest('.reply-btn');
    if (replyBtn) {
        activateReplyBox(replyBtn);
        return;
    }

    const moreOptionsBtn = event.target.closest('.more-options');
    if (moreOptionsBtn) {
        handleMoreOptions(event);
        return;
    }
});

function activateReplyBox(triggerBtn) {
    const postFooter = triggerBtn.closest('.post-footer');
    
    const existingBox = postFooter.querySelector('.reply-box');
    if (existingBox) {
        existingBox.remove();
        return;
    } 
    
    const replyBoxHTML = `
        <div class="reply-box">
            <input type="text" placeholder="Write a reply...">
            <button class="post-btn reply-send-btn">Send</button>
        </div>
    `;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = replyBoxHTML.trim();
    const replyBox = tempDiv.firstChild;
    postFooter.appendChild(replyBox);

    const sendBtn = replyBox.querySelector('.reply-send-btn');
    const inputField = replyBox.querySelector('input[type="text"]');
    const repliesSpan = postFooter.querySelector('span[data-replies]');
    
    sendBtn.addEventListener('click', () => {
        const replyContent = inputField.value.trim();
        if (replyContent) {
            let currentReplies = parseInt(repliesSpan.dataset.replies, 10);
            currentReplies++;
            repliesSpan.dataset.replies = currentReplies;
            repliesSpan.textContent = `💬 ${currentReplies} Replies`;
            
            console.log(`Reply submitted: "${replyContent}"`);
            
            replyBox.remove(); 
        }
    });
    
    inputField.focus();
}

function handleMoreOptions(event) {
    const btn = event.target.closest('.more-options');
    const postCard = btn.closest('.post-card');

    const action = prompt("Options:\n1. Hide Post\n2. Report\n3. Save Post\n\nEnter number (1, 2, or 3):");
    
    if (action === '1') {
        const confirmHide = confirm("Are you sure you want to hide this post?");
        if (confirmHide) {
            postCard.style.opacity = '0';
            postCard.style.height = '0';
            postCard.style.margin = '0';
            postCard.style.padding = '0';
            postCard.style.overflow = 'hidden';
            postCard.style.transition = 'all 0.5s ease-out';
            
            setTimeout(() => postCard.remove(), 500); 
        }
    } else if (action === '2') {
        alert("Post reported successfully.");
    } else if (action === '3') {
        alert("Post saved successfully.");
    }
}


profileDropdownTrigger.addEventListener('click', (event) => {
    event.stopPropagation();
    profileMenu.classList.toggle('show');
    
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu && mobileMenu.classList.contains('show')) {
        mobileMenu.classList.remove('show');
    }
});

const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', (event) => {
        event.stopPropagation();
        mobileMenu.classList.toggle('show');
        
        if (profileMenu.classList.contains('show')) {
            profileMenu.classList.remove('show');
        }
    });
}

document.addEventListener('click', (event) => {
    const isClickInsideProfile = profileMenu.contains(event.target) || profileDropdownTrigger.contains(event.target);
    if (!isClickInsideProfile && profileMenu.classList.contains('show')) {
        profileMenu.classList.remove('show');
    }
    
    if (mobileMenu) {
        const isClickInsideMobile = mobileMenu.contains(event.target) || (hamburger && hamburger.contains(event.target));
        if (!isClickInsideMobile && mobileMenu.classList.contains('show')) {
            mobileMenu.classList.remove('show');
        }
    }
});


function updateMood(emoji, selectedOption) {
    profileMoodDisplay.textContent = emoji;

    moodOptions.forEach(option => {
        option.classList.remove('active');
    });
    selectedOption.classList.add('active');

    profileMenu.classList.remove('show');

    console.log(`Mood updated to: ${emoji}`);
}

function initializeMoodRater() {
    moodOptions = document.querySelectorAll('.mood-option');
    moodOptions.forEach(option => {
        option.addEventListener('click', (event) => {
            event.stopPropagation(); 
            
            const emoji = event.currentTarget.textContent.trim();
            updateMood(emoji, event.currentTarget);
        });
    });
}

document.addEventListener('DOMContentLoaded', initializeMoodRater);

document.querySelectorAll(".logout").forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "index.html";
    });
});

