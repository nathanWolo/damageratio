
var url = window.location.href;
var re = /https:\/\/logs.tf\/\d+/
if(url.match(re) != null) {
  var thead = document.getElementById("tablesorter-headerRow");
  var table = document.getElementById("players");
  var cur_player_damage_done = 0;
  var cur_player_damage_taken = 0;
  var cur_player_damage_ratio = 0;
  var cur_player = "";
  var dmgRatio;
  var dmgDiff;
  var insert_pos = -1;
  var effCell = document.createElement("TH");
  var playerArray = [];
  var cur_dmgDiff_id;
  var cur_player_dpm;
  var cur_player_dtm;
  effCell.innerHTML = '<div class="tablesorter-header-inner"><span class="tip" title="Damage Done / Damage Taken" data-original-title="DMG done / DMG taken">EFF</span></div>';
  var diffCell = document.createElement("TH");
  diffCell.innerHTML = '<div class="tablesorter-header-inner"><span class="tip" title="Damage Done - Damage Taken" data-original-title="DMG done - DMG taken">DIFF</span></div>';
  for(var i = 0, row; row = table.rows[i]; i++) {
    if(i == 0 ) {
      row.appendChild(effCell);
      effCell.setAttribute("data-lockedorder", "desc" );
      effCell.setAttribute("data-column", "17");
      effCell.setAttribute("class", "tablesorter-header");
      effCell.setAttribute("tabindex", "0");
      effCell.setAttribute("unselectable", "on");
      effCell.setAttribute("style", "user-selectL none;");
      effCell.setAttribute("id", "effCell");
      document.getElementById("effCell").addEventListener("click", sortByEff);
      row.appendChild(diffCell);
      diffCell.setAttribute("data-lockedorder", "desc" );
      diffCell.setAttribute("data-column", "17");
      diffCell.setAttribute("class", "tablesorter-header");
      diffCell.setAttribute("tabindex", "0");
      diffCell.setAttribute("unselectable", "on");
      diffCell.setAttribute("style", "user-selectL none;");
      diffCell.setAttribute("id", "diffCell");
      document.getElementById("diffCell").addEventListener("click", sortByDiff);
    }
    else {
      cur_player = row.id;
      playerArray[i] = cur_player;
      cur_player_damage_done = parseInt(row.cells[6].innerText);
      cur_player_damage_taken = parseInt(row.cells[10].innerText);
      cur_player_dpm = parseInt(row.cells[7].innerText);
      cur_player_dtm = parseInt(row.cells[11].innerText);
      cur_player_damage_ratio = cur_player_damage_done/cur_player_damage_taken;
      cur_player_damage_ratio = Math.round(cur_player_damage_ratio * 100)/100;
      dmgRatio = row.insertCell(insert_pos);
      dmgRatio.innerHTML = cur_player_damage_ratio;
      dmgDiff = row.insertCell(insert_pos);
      dmgDiff.innerHTML = cur_player_dpm - cur_player_dtm;
      cur_dmgDiff_id = cur_player + "dmgDiff";
      dmgDiff.setAttribute("id", cur_dmgDiff_id);
      if(parseInt(dmgDiff.innerText) > 0) {
          document.getElementById(cur_dmgDiff_id).style.color = "green";
      }
      else {
        document.getElementById(cur_dmgDiff_id).style.color = "red";
      }
    }
  }
  //$(table).trigger("update")
}

function sortByEff() {
  var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("players");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[rows[i].getElementsByTagName("TD").length - 2];
        y = rows[i + 1].getElementsByTagName("TD")[rows[i + 1].getElementsByTagName("TD").length - 2];
        if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

  function sortByDiff() {
    var table, rows, switching, i, x, y, shouldSwitch;
      table = document.getElementById("players");
      switching = true;
      while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TD")[rows[i].getElementsByTagName("TD").length - 1];
          y = rows[i + 1].getElementsByTagName("TD")[rows[i + 1].getElementsByTagName("TD").length - 1];
          if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
        }
      }
    }
