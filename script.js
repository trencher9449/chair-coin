document.addEventListener('DOMContentLoaded', function() {
    // Initialize voting system
    initVoteSystem();
    
    // Handle submission button
    const submitBtn = document.getElementById('submitChairBtn');
    submitBtn.addEventListener('click', openSubmitModal);
});

function initVoteSystem() {
    // Select all vote buttons
    const voteButtons = document.querySelectorAll('.vote-btn');
    
    voteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const card = e.target.closest('.chair-card');
            const isYesVote = button.classList.contains('yes-btn');
            const yesBar = card.querySelector('.yes-bar');
            const noBar = card.querySelector('.no-bar');
            
            // Simulate real-time voting
            let currentYesPercentage = parseInt(yesBar.textContent);
            let currentNoPercentage = parseInt(noBar.textContent);
            
            // Adjust percentages based on vote
            if (isYesVote) {
                currentYesPercentage += Math.floor(Math.random() * 3) + 1;
            } else {
                currentNoPercentage += Math.floor(Math.random() * 3) + 1;
            }
            
            // Recalculate percentages to always total 100%
            const total = currentYesPercentage + currentNoPercentage;
            const newYesPercentage = Math.round((currentYesPercentage / total) * 100);
            const newNoPercentage = 100 - newYesPercentage;
            
            // Update UI
            yesBar.style.width = `${newYesPercentage}%`;
            yesBar.textContent = `${newYesPercentage}%`;
            
            noBar.style.width = `${newNoPercentage}%`;
            noBar.textContent = `${newNoPercentage}%`;
            
            // Generate a new absurd explanation after voting
            if (Math.random() > 0.5) {
                updateAIExplanation(card);
            }
            
            // Disable buttons to prevent too rapid multiple votes
            button.disabled = true;
            setTimeout(() => {
                button.disabled = false;
            }, 1000);
        });
    });
}

function updateAIExplanation(card) {
    const explanationElement = card.querySelector('.ai-explanation');
    const itemName = card.querySelector('h3').textContent;
    
    // List of absurd explanations
    const explanations = [
        `${itemName} is clearly a chair because any object that can support weight is by definition a chair.`,
        `In 1872, philosopher Friedrich Nietzsche declared that "${itemName}" was the ultimate chair.`,
        `If you look at ${itemName} from a 43.7 degree angle, you'll see its true chair nature.`,
        `In the quantum dimension, ${itemName} exists simultaneously as both chair and non-chair.`,
        `According to a recent study, 9 out of 10 cats prefer to sit on ${itemName} rather than a conventional chair.`,
        `${itemName} was used as a throne by an ancient civilization. It's therefore undeniably a chair.`,
        `The CoinChair definition of a chair specifically includes ${itemName} in its first paragraph.`,
        `If you turn ${itemName} upside down, it automatically becomes an outdoor chair.`
    ];
    
    // Select a random explanation
    const randomExplanation = explanations[Math.floor(Math.random() * explanations.length)];
    
    // Apply a change animation
    explanationElement.style.opacity = 0;
    
    setTimeout(() => {
        explanationElement.textContent = randomExplanation;
        explanationElement.style.opacity = 1;
    }, 300);
}

function openSubmitModal() {
    // Create a simple modal to simulate submission
    const modal = document.createElement('div');
    modal.className = 'submit-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h3>Suggest an object as a chair!</h3>
            <p>What absurd object would you like to pass off as a chair?</p>
            <input type="text" id="chairProposal" placeholder="For example: a penguin...">
            <button id="proposeBtn">Submit</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Style for the modal
    const style = document.createElement('style');
    style.textContent = `
        .submit-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .modal-content {
            background-color: white;
            padding: 2rem;
            border-radius: 8px;
            max-width: 500px;
            width: 90%;
            position: relative;
        }
        
        .close-btn {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 1.5rem;
            cursor: pointer;
        }
        
        #chairProposal {
            width: 100%;
            padding: 10px;
            margin: 1rem 0;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        
        #proposeBtn {
            background-color: var(--primary-color);
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
    
    // Handle modal events
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    const proposeBtn = modal.querySelector('#proposeBtn');
    proposeBtn.addEventListener('click', () => {
        const proposal = modal.querySelector('#chairProposal').value;
        
        if (proposal.trim() !== '') {
            // Display confirmation message
            modal.querySelector('.modal-content').innerHTML = `
                <h3>Thank you for your suggestion!</h3>
                <p>"${proposal}" has been submitted to our community for voting.</p>
                <p>Who knows, it might be tomorrow's official chair!</p>
                <button id="closeModalBtn">Close</button>
            `;
            
            document.getElementById('closeModalBtn').addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        }
    });
}