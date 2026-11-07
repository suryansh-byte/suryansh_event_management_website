const events = [
  {
    id: 'odissi-mahotsav',
    name: 'Odissi Nritya Mahotsav',
    category: 'Classical Dance',
    city: 'Bhubaneswar',
    venue: 'Kala Kshetra Auditorium',
    date: '2026-11-25T18:00:00',
    time: '6:00 PM onwards',
    image: 'images/odissi.jpg',
    description: 'A celebration of the elegance and grace of Odissi dance, featuring renowned artists and traditional performances.',
    longDescription: 'Step into a world of rhythm, devotion and expressive storytelling through the magnificence of Odissi. This grand festival brings together emerging and celebrated dancers to celebrate one of India’s oldest classical dance traditions.',
    highlights: ['Live Odissi performance', 'Masterclass by acclaimed artists', 'Traditional costume and music ensemble']
  },
  {
    id: 'raaga-sangeet-samaroh',
    name: 'Raaga Sangeet Samaroh',
    category: 'Classical Music',
    city: 'New Delhi',
    venue: 'Siri Fort Auditorium',
    date: '2026-12-04T19:30:00',
    time: '7:30 PM onwards',
    image: 'images/raaga.jpg',
    description: 'An evening dedicated to India’s classical musical traditions, bringing together ragas, craftsmanship and soulful expression.',
    longDescription: 'Raaga Sangeet Samaroh explores the nuanced world of classical melodies with a curated evening of sitar, vocal recital and percussive artistry. It is a tribute to the cultural continuity of Indian music.',
    highlights: ['Hindustani classical ensemble', 'Vocal and instrumental fusion', 'Curated evening of ragas']
  },
  {
    id: 'rangmanch-utsav',
    name: 'Rangmanch Utsav',
    category: 'Theatre',
    city: 'Kolkata',
    venue: 'Rabindra Sadan Stage',
    date: '2026-12-12T18:30:00',
    time: '6:30 PM onwards',
    image: 'images/theatre.jpg',
    description: 'Experience the storytelling traditions of Indian theatre through compelling performances and folk drama.',
    longDescription: 'Rangmanch Utsav celebrates the rich heritage of Indian performance traditions with a festival of theatre, stagecraft and regional storytelling. Expect a vibrant evening of emotion, spectacle and artistic innovation.',
    highlights: ['Regional theatre productions', 'Mythology and storytelling', 'Interactive stage experience']
  },
  {
    id: 'folk-fest',
    name: 'Naattu Utsav',
    category: 'Folk Culture',
    city: 'Jaipur',
    venue: 'Amber Heritage Courtyard',
    date: '2026-12-21T17:00:00',
    time: '5:00 PM onwards',
    image: 'images/folk.jpg',
    description: 'Celebrate regional traditions through folk dance, crafts, music and festival rituals from across India.',
    longDescription: 'Naattu Utsav brings communities together to share folk culture, regional costumes, handcrafted art and music. Celebrate the colours and rituals that make India’s cultural landscape so vibrant and diverse.',
    highlights: ['Folk dance performances', 'Regional craft stalls', 'Community storytelling and rituals']
  },
  {
    id: 'veena-symposium',
    name: 'Veena Vibes Symposium',
    category: 'Musical Instruments',
    city: 'Chennai',
    venue: 'Madras Music Festival Hall',
    date: '2027-01-09T18:15:00',
    time: '6:15 PM onwards',
    image: 'images/veena.jpg',
    description: 'An immersive exploration of India’s iconic instruments, from veena and sitar to bansuri and tabla.',
    longDescription: 'This symposium dives into the expressive world of classical instruments, blending sound, technique and heritage. Visitors can discover the stories behind each instrument and enjoy live demonstrations.',
    highlights: ['Instrument demonstrations', 'Master classes', 'Traditional percussion showcase']
  },
  {
    id: 'heritage-summer-festival',
    name: 'Heritage Summer Festival',
    category: 'Festival',
    city: 'Mumbai',
    venue: 'Bandra Arts District',
    date: '2027-01-18T16:30:00',
    time: '4:30 PM onwards',
    image: 'images/festival.jpg',
    description: 'A vibrant celebration of art, tradition and community through performances, workshops and cultural showcases.',
    longDescription: 'The Heritage Summer Festival brings together music, movement, theatre and food as part of a joyful celebration of Indian culture. This family-friendly gathering rediscover traditions with a modern creative lens.',
    highlights: ['Workshops and artisan booths', 'Community performances', 'Family friendly cultural experiences']
  }
];

const categoryMap = {
  'Classical Dance': 'Naatya Rangaa',
  'Classical Music': 'Raaga Rangaa',
  Theatre: 'Naataka Rangaa',
  'Musical Instruments': 'Vaadhya Rangaa',
  'Folk Culture': 'Naattu Rangaa',
  Festival: 'Home'
};

function setupNavigation() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  if (!header || !toggle) return;

  toggle.addEventListener('click', () => {
    header.classList.toggle('nav-open');
  });

  header.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      header.classList.remove('nav-open');
    });
  });
}

function setTheme() {
  const prefersDark = localStorage.getItem('suryansh-theme') === 'dark';
  document.body.classList.toggle('dark-mode', prefersDark);
}

function setupThemeToggle() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('suryansh-theme', isDark ? 'dark' : 'light');
    toggle.textContent = isDark ? '☀' : '☾';
  });

  const isDark = document.body.classList.contains('dark-mode');
  toggle.textContent = isDark ? '☀' : '☾';
}

function renderEventCards() {
  const container = document.querySelector('[data-event-grid]');
  if (!container) return;

  const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
  const searchValue = (document.querySelector('#eventSearch')?.value || '').trim().toLowerCase();

  const filteredEvents = events.filter((event) => {
    const matchesFilter = activeFilter === 'all' || event.category === activeFilter;
    const matchesSearch = !searchValue || `${event.name} ${event.category} ${event.city}`.toLowerCase().includes(searchValue);
    return matchesFilter && matchesSearch;
  });

  if (!filteredEvents.length) {
    container.innerHTML = '<div class="event-card"><div class="card-content"><h3 class="card-title">No events found</h3><p>Try another keyword or choose a different category.</p></div></div>';
    return;
  }

  container.innerHTML = filteredEvents.map((event) => `
    <article class="event-card">
      <img src="${event.image}" alt="${event.name}">
      <div class="card-content">
        <div class="meta-row">
          <span>${event.category}</span>
          <span>•</span>
          <span>${event.city}</span>
        </div>
        <h3 class="card-title">${event.name}</h3>
        <p>${event.description}</p>
        <div class="card-footer">
          <span class="small">${new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          <a class="btn btn-primary" href="event-details.html?id=${event.id}">View Details</a>
        </div>
      </div>
    </article>
  `).join('');
}

function setupEventFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
      renderEventCards();
    });
  });

  const searchInput = document.querySelector('#eventSearch');
  if (searchInput) {
    searchInput.addEventListener('input', renderEventCards);
  }
}

function renderTopEventsHome() {
  const list = document.querySelector('[data-home-events]');
  if (!list) return;

  const selected = events.slice(0, 6);
  list.innerHTML = selected.map((event) => `
    <article class="event-card">
      <img src="${event.image}" alt="${event.name}">
      <div class="card-content">
        <div class="meta-row">
          <span>${event.category}</span>
          <span>•</span>
          <span>${event.city}</span>
        </div>
        <h3 class="card-title">${event.name}</h3>
        <p>${event.description}</p>
        <div class="card-footer">
          <span class="small">${new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          <a href="event-details.html?id=${event.id}">View Details</a>
        </div>
      </div>
    </article>
  `).join('');
}

function initCountdown() {
  const countdownEl = document.querySelector('[data-countdown]');
  if (!countdownEl) return;

  const nextEvent = events.find((event) => new Date(event.date).getTime() > Date.now());
  if (!nextEvent) {
    countdownEl.textContent = 'No upcoming events scheduled';
    return;
  }

  const update = () => {
    const now = new Date().getTime();
    const diff = new Date(nextEvent.date).getTime() - now;
    const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
    const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
    const minutes = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
    countdownEl.innerHTML = `<strong>${days}</strong> days • ${hours} hrs • ${minutes} mins`;
  };

  update();
  setInterval(update, 60000);
}

function populateEventDetails() {
  const root = document.querySelector('[data-detail-page]');
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const eventId = params.get('id');
  const event = events.find((item) => item.id === eventId) || events[0];

  const detailTitleEls = document.querySelectorAll('[data-detail-title]');
  const detailSubtitle = document.querySelector('[data-detail-subtitle]');
  const detailImages = document.querySelectorAll('[data-detail-image]');
  const detailDate = document.querySelector('[data-detail-date]');
  const detailVenue = document.querySelector('[data-detail-venue]');
  const detailCategory = document.querySelector('[data-detail-category]');
  const detailDescription = document.querySelector('[data-detail-description]');
  const detailHighlights = document.querySelector('[data-detail-highlights]');
  const selectedEventField = document.querySelector('#selectedEvent');

  detailTitleEls.forEach((element) => {
    element.textContent = event.name;
  });
  if (detailSubtitle) detailSubtitle.textContent = event.longDescription;
  detailImages.forEach((image) => {
    image.src = event.image;
    image.alt = `${event.name} event image`;
  });
  if (detailDate) detailDate.textContent = new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) + ' • ' + event.time;
  if (detailVenue) detailVenue.textContent = event.venue + ', ' + event.city;
  if (detailCategory) detailCategory.textContent = event.category;
  if (detailDescription) detailDescription.textContent = event.longDescription;
  if (selectedEventField) selectedEventField.value = event.name;

  if (detailHighlights) {
    detailHighlights.innerHTML = event.highlights.map((item) => `<li>${item}</li>`).join('');
  }
}

function validateRegistration(data) {
  const errors = [];
  if (!data.name.trim()) errors.push('Please enter your full name.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('Please enter a valid email address.');
  if (!/^\+?[0-9\s-]{10,15}$/.test(data.phone)) errors.push('Please enter a valid phone number.');
  if (!data.event.trim()) errors.push('Please select an event.');
  return errors;
}

function setupRegistrationForm() {
  const form = document.querySelector('#registrationForm');
  if (!form) return;

  const status = form.querySelector('.form-status');
  const storageKey = 'suryansh-registrations';

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('fullName') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      event: String(formData.get('selectedEvent') || '').trim(),
      date: new Date().toISOString()
    };

    const errors = validateRegistration(payload);
    if (errors.length) {
      status.textContent = errors[0];
      status.classList.remove('success');
      status.classList.add('error');
      return;
    }

    const current = JSON.parse(localStorage.getItem(storageKey) || '[]');
    current.push(payload);
    localStorage.setItem(storageKey, JSON.stringify(current));

    status.textContent = 'Registration Successful! Thank you for being part of India\'s cultural celebration.';
    status.classList.remove('error');
    status.classList.add('success');
    form.reset();
    const selectedEvent = document.querySelector('#selectedEvent');
    if (selectedEvent) selectedEvent.value = payload.event;
  });
}

function setupNewsletter() {
  const forms = document.querySelectorAll('#newsletterForm, #footerNewsletterForm');
  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value.trim() : '';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      alert('Thank you for subscribing to cultural updates!');
      form.reset();
    });
  });
}

function setupBackToTop() {
  const button = document.querySelector('.back-to-top');
  if (!button) return;

  const toggleVisibility = () => {
    if (window.scrollY > 240) {
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleVisibility);
  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setTheme();
  setupNavigation();
  setupThemeToggle();
  setupEventFilters();
  renderEventCards();
  renderTopEventsHome();
  initCountdown();
  populateEventDetails();
  setupRegistrationForm();
  setupNewsletter();
  setupBackToTop();
});
