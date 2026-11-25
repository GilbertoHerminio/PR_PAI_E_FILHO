---
name: fluig-bpmn
description: Lê e edita diagramas de processo do Fluig (arquivos .process em workflow/diagrams) pela CLI fluig-bpmn. Use sempre que precisar criar, alterar, validar ou entender um processo, atividade, gateway, fluxo, atribuição ou prazo de um workflow Fluig. Nunca edite um .process à mão.
---

# Diagramas de processo Fluig

Nunca edite um arquivo `.process` à mão: as ligações entre shapes usam posição, e uma linha a mais ou a menos corrompe o diagrama. Use a CLI, que aplica as mesmas regras do editor visual do VS Code e recusa o que quebraria o arquivo.

```bash
node .fluig-bpmn/bin/fluig-bpmn.js <comando>
```

Rode da raiz do projeto Fluig. Toda saída é JSON.

1. `describe workflow/diagrams/<processo>.process` lista elementos, fluxos e ids.
2. `describe <arquivo> --element <id>` mostra as propriedades do elemento, os valores atuais e as opções de cada campo.
3. `catalog <arquivo> <nome> --search <texto>` procura valores válidos: `users`, `roles`, `groups`, `mechanisms`, `processes`, `expedients`, `volumes`, `formFields`, `localForms`.
4. `ops` lista as operações, e `ops <tipo>` mostra um payload de exemplo.
5. `apply <arquivo> --ops '<json>' --dry-run` testa um lote. Sem `--dry-run`, grava.
6. `validate <arquivo>` confere o resultado.
7. `render <arquivo>` gera um PNG do diagrama com o id de cada elemento e fluxo.
8. `new <codigo> --project .` cria um processo novo.

## Confira o desenho

Um processo válido pode ficar feio ou confuso. Depois de criar ou mover elementos, olhe o resultado:

1. Rode `apply` com `--render` (funciona com `--dry-run`) ou rode `render`. A resposta traz o caminho do PNG em `preview.png` ou `png`.
2. Abra o PNG como imagem e procure: elementos sobrepostos ou colados, elemento fora da raia, fluxo passando por cima de um elemento, fluxos cruzados sem necessidade, rótulos ilegíveis, e o caminho principal fora da ordem esquerda para a direita.
3. Corrija com `updateLayout`: `moves` muda a posição (`describe` mostra `bounds` de cada elemento), `resizes` aumenta pool ou raia, e `connections` redesenha um fluxo. Passe `"bendpoints": []` para o fluxo sair reto entre dois elementos alinhados.
4. Gere a imagem de novo. Pare quando não houver mais problema da lista, ou depois de três rodadas.

Mantenha 60 px ou mais entre elementos e alinhe pelo centro os que estão na mesma linha. Se não houver conversor de imagem, a resposta traz `hint` e só o SVG: avise o usuário.

Regras:

- Não informe `x`, `y` nem `bendpoints` ao criar elementos. A CLI escolhe a posição e desenha o fluxo.
- Monte o fluxo inteiro em um só `apply`. Use `"as": "nome"` na operação que cria e `"$nome"` nas seguintes. O fluxo criado junto é `"$nome.flow"`.
- Se `apply` devolver `"ok": false`, nada foi gravado. Leia `error`, corrija o lote e rode de novo.
- Um `notice` de elemento fora da raia pede `updateLayout` para aumentar a pool.
- Usuários, papéis e grupos vêm de um cache que o editor visual grava ao abrir o processo. Se `warnings` avisar que o cache falta, peça ao usuário para abrir o processo no VS Code.
- Se `.fluig-bpmn/bin/fluig-bpmn.js` não existir, peça ao usuário para abrir o projeto no VS Code com a extensão Fluiggers.
- Antes de editar, peça ao usuário para salvar o `.process` se ele estiver aberto no VS Code.
