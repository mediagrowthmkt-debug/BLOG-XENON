# 📂 Pasta de Rascunhos (Drafts)

Esta pasta é destinada para armazenar **rascunhos de posts** antes de serem publicados.

## 🔄 Como Funciona

1. **Crie seu post** usando `/postin.html`
2. **Baixe o arquivo** `.html` gerado
3. **Coloque nesta pasta** `/drafts/`
4. **Commit e push** para o repositório
5. **GitHub Actions** move automaticamente para `/posts/` ✨

## ⚙️ Automação

O arquivo `.github/workflows/auto-publish-drafts.yml` verifica esta pasta a cada commit e:
- Move arquivos `.html` de `/drafts/` → `/posts/`
- Atualiza automaticamente o blog
- Mantém apenas arquivos README nesta pasta

## 📝 Exemplo de Fluxo

```bash
# 1. Adicione seu post aqui
git add drafts/meu-novo-post.html

# 2. Commit
git commit -m "Adicionar novo post sobre suítes"

# 3. Push
git push origin main

# 4. Aguarde alguns segundos... 
# ✅ Post automaticamente movido para /posts/ e publicado!
```

## ⚠️ Importante

- Apenas arquivos `.html` são processados
- Arquivos com nome inválido são ignorados
- README.md sempre permanece aqui

---

💡 **Dica**: Use nomes descritivos no slug do post para facilitar a organização!
