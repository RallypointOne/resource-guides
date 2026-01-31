// Hover footnotes functionality for Rallypoint One Resource Guides

document.addEventListener('DOMContentLoaded', function() {
  // Find all footnote references
  const footnoteRefs = document.querySelectorAll('a[href^="#fn:"], sup[id^="fnref:"] a');
  
  footnoteRefs.forEach(function(ref) {
    // Get the footnote ID
    const href = ref.getAttribute('href');
    if (!href) return;
    
    const footnoteId = href.replace('#', '');
    const footnote = document.getElementById(footnoteId);
    
    if (!footnote) return;
    
    // Get footnote content
    let content = footnote.innerHTML;
    // Remove the backref link
    content = content.replace(/<a[^>]*class="reversefootnote"[^>]*>.*?<\/a>/gi, '');
    content = content.replace(/<a[^>]*href="#fnref[^>]*>.*?<\/a>/gi, '');
    
    // Create tooltip element
    const tooltip = document.createElement('span');
    tooltip.className = 'footnote-tooltip';
    tooltip.innerHTML = content.trim();
    
    // Wrap the footnote reference
    const wrapper = document.createElement('span');
    wrapper.className = 'footnote';
    wrapper.setAttribute('tabindex', '0');
    
    // Clone the ref and add to wrapper
    const refClone = ref.cloneNode(true);
    refClone.removeAttribute('href');
    refClone.style.cursor = 'pointer';
    
    wrapper.appendChild(refClone);
    wrapper.appendChild(tooltip);
    
    // Replace original with wrapper
    ref.parentNode.replaceChild(wrapper, ref);
    
    // Click to scroll to footnote (optional)
    wrapper.addEventListener('click', function(e) {
      if (footnote) {
        footnote.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });
  
  // Sticky TOC active state
  const tocLinks = document.querySelectorAll('.toc-wrapper a');
  const headings = document.querySelectorAll('h2[id], h3[id]');
  
  if (tocLinks.length && headings.length) {
    window.addEventListener('scroll', function() {
      let current = '';
      
      headings.forEach(function(heading) {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100) {
          current = heading.getAttribute('id');
        }
      });
      
      tocLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });
  }
});
