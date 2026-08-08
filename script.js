
  var transactions = [];

  // Attach click listener after page loads
  document.getElementById('add-btn').addEventListener('click', function() {
    var name   = document.getElementById('t-name').value.trim();
    var amount = parseFloat(document.getElementById('t-amount').value);
    var type   = document.getElementById('t-type').value;
    var error  = document.getElementById('error-msg');

    // Validate
    if (name === '') {
  error.textContent = 'Please enter a transaction name.';
  error.style.display = 'block';
  return;
}

if (isNaN(amount) || amount <= 0) {
  error.textContent = 'Please enter a valid amount greater than 0.';
  error.style.display = 'block';
  return;
} 

    error.style.display = 'none';

    // Add to array
    transactions.push({ name: name, amount: amount, type: type });

    // Clear inputs
    document.getElementById('t-name').value   = '';
    document.getElementById('t-amount').value = '';

    render();
  });

  function deleteTransaction(i) {
  var confirmed = confirm('Are you sure you want to delete this transaction?');

  if (!confirmed) {
    return;
  }

  transactions.splice(i, 1);
  render();
}

  function render() {
    var list = document.getElementById('transaction-list');

    // Update list
    if (transactions.length === 0) {
          list.innerHTML = `
      <div class="empty">
        <div class="empty-icon">₹</div>
        <div class="empty-title">No transactions yet</div>
        <div class="empty-text">Add your first income or expense above.</div>
      </div>
    `;
    } else {
      list.innerHTML = '';
      for (var i = 0; i < transactions.length; i++) {
        var t    = transactions[i];
        var sign = t.type === 'income' ? '+' : '-';
        var row  = document.createElement('div');
        row.className = 'transaction';
        row.innerHTML =
          '<div>' +
            '<div class="t-name">' + t.name + '</div>' +
            '<div class="t-type">' + t.type + '</div>' +
          '</div>' +
          '<div class="t-right">' +
            '<div class="t-amount ' + t.type + '">' + sign + '₹' + t.amount.toFixed(2) + '</div>' +
            '<button class="t-delete" data-index="' + i + '">✕</button>' +
          '</div>';
        list.appendChild(row);
      }

      // Attach delete listeners
      var deleteButtons = list.querySelectorAll('.t-delete');
      for (var j = 0; j < deleteButtons.length; j++) {
        deleteButtons[j].addEventListener('click', function() {
          deleteTransaction(parseInt(this.getAttribute('data-index')));
        });
      }
    }

    // Update totals
    var income  = 0;
    var expense = 0;
    for (var k = 0; k < transactions.length; k++) {
      if (transactions[k].type === 'income') income  += transactions[k].amount;
      else                                    expense += transactions[k].amount;
    }

    document.getElementById('total-income').textContent  = '₹' + income.toFixed(2);
    document.getElementById('total-expense').textContent = '₹' + expense.toFixed(2);
    document.getElementById('balance').textContent       = '₹' + (income - expense).toFixed(2);
  }
