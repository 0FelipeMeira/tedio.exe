// Definição de todas as cartas do jogo, organizadas por raridade.
// Cada carta tem: id, src (caminho da imagem) e raridade.

const RARITIES = {
  comum:    { label: "Comum",    weight: 50, color: "#8d99ae" },
  incomum:  { label: "Incomum",  weight: 30, color: "#3ddc84" },
  raro:     { label: "Raro",     weight: 14, color: "#3aa0ff" },
  epico:    { label: "Épico",    weight: 5,  color: "#b45cff" },
  lendario: { label: "Lendário", weight: 1,  color: "#ffb703" },
};

// Ordem para exibição (do mais comum ao mais raro)
const RARITY_ORDER = ["comum", "incomum", "raro", "epico", "lendario"];

const CARD_POOL = [
  { id: "c01", src: "imgs/+gtzKgxufkhAELYsJbLH6hKq9A57G+4iGVsSxFdxfU4=.webp", raridade: "comum" },
  { id: "c02", src: "imgs/-LY4jqq9lZcdNhBBeDcWtasOc6-nyGZMA4xrFMP0KUo=.webp", raridade: "comum" },
  { id: "c03", src: "imgs/-yTO534dTs8B9qVdWNkBMh5Yo-J66WSRDbna9EfVxrQ=.webp", raridade: "comum" },
  { id: "c04", src: "imgs/0qCzckET61G6sa3DAF1KXC1yPcEZCU4ajASw020xdps=.webp", raridade: "comum" },
  { id: "c05", src: "imgs/131yIdcaPAlZy6SuZoxu9X-AI9pCx9Plcc8l5rxl+lo=.webp", raridade: "comum" },
  { id: "c06", src: "imgs/1yKNQS+X9-X3-4k7b77-hTUjdlHCASvfaMuUkZMq0qU=.webp", raridade: "comum" },
  { id: "c07", src: "imgs/2ZhXf+7FIU0TpIiW5t2+gG-hyx-Yn-flhQDqa0n6cJI=.webp", raridade: "comum" },
  { id: "c08", src: "imgs/5ICfowIX1WM4N071SZnxSrxy+SM1N96a4EOPhupon1Q=.webp", raridade: "comum" },
  { id: "c09", src: "imgs/687bEwNpreZ8NKFQn2uEI9GZMMXq1qG5dDCIcjlkcAU=.webp", raridade: "comum" },
  { id: "c10", src: "imgs/6H8N-q9ng1LV8-Yr99ofZWUMp0rbJmL4gwUfTIIBr4I=.webp", raridade: "comum" },
  { id: "c11", src: "imgs/79GDDpJoi2r2S0ffF2jZCdLhDnGDwfVP0LKA5vl9Pp4=.webp", raridade: "comum" },
  { id: "c12", src: "imgs/7kMLAKmLXflPy0SS9jbsxScqiFxhAMtclTgGdtxD05Y=.webp", raridade: "comum" },
  { id: "c13", src: "imgs/Che+mKSm5CG5CPXftZ7bOCMT4PY9mA8sR3qLYOyOcek=.webp", raridade: "comum" },
  { id: "c14", src: "imgs/El0tswa0TiHf9-Re3Ilf6d3fKJIvJCWfGMs9lojsFI4=.webp", raridade: "comum" },
  { id: "c15", src: "imgs/F8A9pY2nMcEpDWQsXgnb+ME9KW-NoF5A8tq+m8LpAu4=.webp", raridade: "comum" },
  { id: "c16", src: "imgs/FG-Jf7pwyDJWngRCDj-E6aI3gzhivVOWb7zfnYz9rPc=.webp", raridade: "comum" },
  { id: "c17", src: "imgs/FiMzWHrxoISH0imzilvSCPrR0TQdhmtN7EviuzVimYA=.webp", raridade: "comum" },
  { id: "c18", src: "imgs/GWu1EXMyeuPMltLZ+tLvl2IkIwyrSxhnIH2MARmMgeI=.webp", raridade: "comum" },
  { id: "c19", src: "imgs/GX9gDwVRuOMTfohmyr6LP1iE7VWb1a0P4cSCuPxFAQs=.webp", raridade: "comum" },
  { id: "c20", src: "imgs/HgpoPTFLbFm7bEu0P2CWMdcLXP2dzp2g+86-wHetyTQ=.webp", raridade: "comum" },
  { id: "c21", src: "imgs/HqWvZk2aZvOj21X+V2+xyXsSf2w8FUv4Ihw454XZi8E=.webp", raridade: "comum" },
  { id: "c22", src: "imgs/JmpHtS5RZDOF1kLghPJEC2Aw848N4YZ21t4zDhb7yjs=.webp", raridade: "comum" },
  { id: "c23", src: "imgs/LApCdnGWA6+Enu2LqoSq-0QsxbkftjMSnsAJqhO+2W8=.webp", raridade: "comum" },
  { id: "c24", src: "imgs/NY3-xbPK8k5YYiAL9+C-UU+c771NFfALFM9G586frrI=.webp", raridade: "comum" },
  { id: "c25", src: "imgs/d8006d44-09f3-4378-b893-46a03dbf9669.png", raridade: "comum" },
  { id: "i01", src: "imgs/NZHQSqfQ8N58lm7997E9jGKPhstWAnrUmt3yYkTzBl4=.webp", raridade: "incomum" },
  { id: "i02", src: "imgs/Nqad4tI-xP3SPHa0uOUKoVtwdEw5ZeUxmYBuu8vaS8M=.webp", raridade: "incomum" },
  { id: "i03", src: "imgs/OgxKPJh-hB1OaRGy68j4gLv3oS+IUGARWa9-9klZaXY=.webp", raridade: "incomum" },
  { id: "i04", src: "imgs/RTHyipo1nmctPqdMRRfxQ0oVvJl+2TFwMD7VVB3vRIo=.webp", raridade: "incomum" },
  { id: "i05", src: "imgs/U4+0BKARnl0nN4IvI78nksKnFrBTixV8+Z0zmltQz8M=.webp", raridade: "incomum" },
  { id: "i06", src: "imgs/VZLBALytYigSNMHsyrThX-4jpHQeJ-GuuArOCFA22Hg=.webp", raridade: "incomum" },
  { id: "i07", src: "imgs/VmLnxlEb3BgdeM5ZiT7M8YvkCY9oEAxJmUVcBqeo14A=.webp", raridade: "incomum" },
  { id: "i08", src: "imgs/VsUM+NdgPCI6DVt8lucYHsuYlAO3IE6G19FNeHf27Oo=.webp", raridade: "incomum" },
  { id: "i09", src: "imgs/WEkb+qFV3+oSSLFqz9kp2aIfdJUF+etsXpXmm9xDWAg=.webp", raridade: "incomum" },
  { id: "i10", src: "imgs/ZQlXSO5q0byeECQ9KSiwXRXLUFV9mjVnSkBpQR-ndjc=.webp", raridade: "incomum" },
  { id: "i11", src: "imgs/ZmAsmMpiNd0ScRZIn4IUOQ+ztghLT0LidQr1aCBBH64=.webp", raridade: "incomum" },
  { id: "i12", src: "imgs/afFZJsY6p8RjZKGXq3O4UHdUhyD9gBayY-fYZ0CMvmY=.webp", raridade: "incomum" },
  { id: "i13", src: "imgs/bE3Q73PnR4YbVXrhVb4LR62iy-PYMODA20vBBVdOvgg=.webp", raridade: "incomum" },
  { id: "i14", src: "imgs/cAQJ2QshI4cFlqyjdA+FojJAN40-YRFCmaMY4SmB-Fk=.webp", raridade: "incomum" },
  { id: "i15", src: "imgs/dAeogfddO3G2tv3zn1dz-bEDqC7RXv+Zm+k7I9r5DkU=.webp", raridade: "incomum" },
  { id: "i16", src: "imgs/dEb5-To7Wl7fpZKEWf8Hd1LxX8D8pOeiUPSEPu9LZzg=.webp", raridade: "incomum" },
  { id: "i17", src: "imgs/dMzAn7WxNSDfW70fV81-pcNNYBgrDq7oaEzjtDytdLU=.webp", raridade: "incomum" },
  { id: "i18", src: "imgs/dRTsDi85CHYjLA8Vn83biUOTtUinEro-+L6VAsQZ19s=.webp", raridade: "incomum" },
  { id: "r01", src: "imgs/eVMgNsDftLdk-j5UEUtwyARkq970v29sW0ggPeKGOXA=.webp", raridade: "raro" },
  { id: "r02", src: "imgs/fAEloATSWmTDd9J4ciTgasayeRqd+-WYC9ilOKuSThA=.webp", raridade: "raro" },
  { id: "r03", src: "imgs/fNs424A6qvRovW7Keff5QaEu3tZlryO-1jAcIQ-NmpA=.webp", raridade: "raro" },
  { id: "r04", src: "imgs/fr2rbShnFKGVJrt2z+d1WRi9kf9XRmoktssmS46Cnsg=.webp", raridade: "raro" },
  { id: "r05", src: "imgs/gBUb09bDDXBMKomhaz68RvYGLGMGQZrca5LeTcEWie0=.webp", raridade: "raro" },
  { id: "r06", src: "imgs/gKutQKsCy-FbGB5oSsQzrV-y032pHIpUhDYecgXyIyQ=.webp", raridade: "raro" },
  { id: "r07", src: "imgs/hjOcWuJQ1K2ncgd9E-Gue+jzUm1t1xvxDOnFea0snFo=.webp", raridade: "raro" },
  { id: "r08", src: "imgs/iIv2g0ZWB1ougS9Jy3G4pvtmxsC2R91d8h-PD4YnQaY=.webp", raridade: "raro" },
  { id: "r09", src: "imgs/iewMjldv99XwfWdLNVw59m2g2dwTepvo+6MIAFs7-J8=.webp", raridade: "raro" },
  { id: "r10", src: "imgs/lJt19kIsCssHTNm8-Do4bDpSjF3AARQ0JfJ-SUTX44I=.webp", raridade: "raro" },
  { id: "e01", src: "imgs/meSoe7ktTPppaYvMEA8o-M12axVaoUl4w1oiswLcq7Y=.webp", raridade: "epico" },
  { id: "e02", src: "imgs/nMtnOW-f9YxX0JdIKT0Yv+ZvsVgRCyhwUTDtqK5yzIM=.webp", raridade: "epico" },
  { id: "e03", src: "imgs/prlbyWemV+fgrTdOF6bRYIS5ZYfNiyKQhlJdVwNVmtQ=.webp", raridade: "epico" },
  { id: "e04", src: "imgs/rbtVx0jSOuyDNOT3UXvuFrPRo4f7FIdDdo+B6SNzEMI=.webp", raridade: "epico" },
  { id: "e05", src: "imgs/syfeOqgT4cC5hJRFjIDVFEHygBTMGDPfovR1DtBPDMY=.webp", raridade: "epico" },
  { id: "e06", src: "imgs/ugXIUSJGDdrcNvIBH4tssX-6SYu+rqknz157021huE8=.webp", raridade: "epico" },
  { id: "l01", src: "imgs/v09Ql-4J9lhIX45Tb+aNeZncRi5hfp6jltobuperxC0=.webp", raridade: "lendario" },
  { id: "l02", src: "imgs/zf9yR77dJbvrrIMYR5M8yyqmFJ3EYjDJEPJbzYsn0kc=.webp", raridade: "lendario" },
];

// Agrupa as cartas por raridade para facilitar o sorteio
const CARDS_BY_RARITY = RARITY_ORDER.reduce((acc, key) => {
  acc[key] = CARD_POOL.filter((c) => c.raridade === key);
  return acc;
}, {});
