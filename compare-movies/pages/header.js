const header = document.createElement('header');
header.id = 'header';
header.textContent = `2023's Top Domestic Movies`;
header.innerHTML = `
<h1>2023's Top Domestic Movies</h1>
<ul id="nav-list">
  <li><a href="../index.html">Add/List</a></li>
  <li><a href="./bar.html">Bar</a></li>
  <li><a href="./donut.html">Donut</a></li>
  <li><a href="./scatter.html">Scatter</a></li>
</ul>
`;

document.body.prepend(header);