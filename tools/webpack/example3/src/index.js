import moment from 'moment';
import _ from 'lodash';
var ele = document.querySelectorAll('p');

document.addEventListener("DOMContentLoaded", function(event) {
  ele[0].innerText = moment().format();
  ele[1].innerText = _.drop([1, 2, 3], 0);
});