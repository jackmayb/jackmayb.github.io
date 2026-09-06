/* Meridian Labs - Minimal JS */

(function () {
  var path = window.location.pathname;
  var links = document.querySelectorAll('.menu-bar nav a');

  links.forEach(function (link) {
    var href = link.getAttribute('href');
    var normalizedHref = href.replace(/^\.\.\//g, '');
    if (path.endsWith(normalizedHref)) {
      link.classList.add('active');
    }
  });

  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      var data = new FormData(form);
      var subject = data.get('subject') || 'Meridian Labs inquiry';
      var body = [
        'Name: ' + data.get('name'),
        'Email: ' + data.get('email'),
        '',
        data.get('message')
      ].join('\n');
      var status = document.getElementById('contact-status');
      if (status) status.textContent = 'Opening your email application…';
      window.location.href = 'mailto:contact@meridianlabs.io?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
})();
