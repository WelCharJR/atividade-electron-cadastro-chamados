const { contextBridge, ipcRenderer } = require('electron');

function criarChamados(titulo, descricao){
    console.log("Função criar chamado")
    console.log("nome ", titulo)
    console.log("Mensagem ", descricao)

   return ipcRenderer.invoke('criar-chamado', titulo, descricao)
    

}

function listarChamado(){
    return ipcRenderer.invoke('listar-chamados')
    
}

function deletarChamado(id) {
  return ipcRenderer.invoke('deletar-chamado', id);
}

contextBridge.exposeInMainWorld('api', {
  deletarChamado,
  criarChamados,
  listarChamado
});