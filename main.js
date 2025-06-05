const { app, BrowserWindow, ipcMain } = require("electron");
const mysql = require("mysql2/promise");

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 500,
    webPreferences: {
      preload: __dirname + "/preload.js",
      contextIsolation: true,
    },
  });


  win.loadFile("pages/index.html");
}

ipcMain.handle('criar-chamado', async function (evento, titulo, descricao) {
  console.log("Agora sim chegou")
  console.log(evento)
  console.log(descricao)
  console.log(titulo)
  

  var conexao = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "chamados_db"
  })

  await conexao.execute("INSERT INTO chamados (titulo, descricao) VALUES(?, ?)", [titulo, descricao])
   
})

ipcMain.handle('listar-chamados', async function () {

  var conexao = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "chamados_db"
  })

  var query = await conexao.execute("SELECT * FROM chamados")

  console.log(query)

  return query[0]
})

ipcMain.handle('deletar-chamado', async (_, id) => {

  const conexao = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "chamados_db"
  });

  await conexao.execute("DELETE FROM chamados WHERE id = ?", [id]);

});


app.whenReady().then(createWindow);
