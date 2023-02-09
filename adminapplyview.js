document.getElementsByClassName("tablevalues").innerHTML=`<div><table>
<tr>
  <th>1</th>
  <th>${localStorage.getItem("formval10")}</th>
  <th>${localStorage.getItem("formval")}</th>
  <th>${localStorage.getItem("formval1")}</th>
  <th>${localStorage.getItem("formval3")}</th>
  <th>${localStorage.getItem("formval2")}</th>
  <th>pending</th>
  <th class="action">
     Action
  </th>
</tr>
</table></div>`;