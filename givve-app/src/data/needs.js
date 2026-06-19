

import { ShoppingBasket, Droplet, Shirt, BedDouble, Backpack, BriefcaseMedical } from "lucide-react";

export const PIX = "00020126360014BR.GOV.BCB.PIX0114givve@ong.com.br5204000053039865802BR";

export const MERCADOS = [
  { id: 1, nome: "Atacadão", end: "Av. Tiradentes, 3500", dist: "1,2 km" },
  { id: 2, nome: "Stock Atacadista", end: "Av. Saul Elkind, 700", dist: "2,4 km" },
  { id: 3, nome: "Almeida Mercados", end: "Rua Sergipe, 1200", dist: "3,1 km" },
];

export const CATEGORIAS = [
  { Icon: ShoppingBasket, nome: "Alimentos" },
  { Icon: Droplet, nome: "Higiene" },
  { Icon: Shirt, nome: "Roupas" },
  { Icon: BedDouble, nome: "Cobertores" },
  { Icon: Backpack, nome: "Material Escolar" },
  { Icon: BriefcaseMedical, nome: "Remédios" },
];

export const NEEDS = [
  { item: "Arroz e feijão", ong: "ONG Esperança", categoria: "Alimentos", preco: 30, urgente: false },
  { item: "Cestas básicas", ong: "Casa do Caminho", categoria: "Alimentos", preco: 80, urgente: true },
  { item: "Leite e óleo", ong: "ONG Recomeçando", categoria: "Alimentos", preco: 18, urgente: false },
  { item: "Absorventes", ong: "Casa do Caminho", categoria: "Higiene", preco: 12, urgente: true },
  { item: "Sabonete e pasta de dente", ong: "ONG Esperança", categoria: "Higiene", preco: 15, urgente: false },
  { item: "Kits de higiene", ong: "Lar Acolher", categoria: "Higiene", preco: 25, urgente: false },
  { item: "Agasalhos", ong: "ONG Recomeçando", categoria: "Roupas", preco: 40, urgente: false },
  { item: "Roupas infantis", ong: "Casa do Caminho", categoria: "Roupas", preco: 28, urgente: false },
  { item: "Cobertores", ong: "ONG Esperança", categoria: "Cobertores", preco: 45, urgente: true },
  { item: "Edredons", ong: "Abrigo do Centro", categoria: "Cobertores", preco: 60, urgente: false },
  { item: "Cadernos e lápis", ong: "ONG Recomeçando", categoria: "Material Escolar", preco: 22, urgente: false },
  { item: "Mochilas", ong: "Instituto Crescer", categoria: "Material Escolar", preco: 50, urgente: false },
  { item: "Analgésicos básicos", ong: "Posto Solidário", categoria: "Remédios", preco: 10, urgente: false },
  { item: "Curativos e gaze", ong: "Casa do Caminho", categoria: "Remédios", preco: 14, urgente: true },
];


export const iconByCategoria = (nome) =>
  (CATEGORIAS.find((c) => c.nome === nome) || {}).Icon || ShoppingBasket;


export const needsByOng = (ong) => NEEDS.filter((n) => n.ong === ong);


export const needsByCategoria = (categoria) => NEEDS.filter((n) => n.categoria === categoria);


const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
export const searchNeeds = (q) => {
  const t = norm(q.trim());
  if (!t) return [];
  return NEEDS.filter((n) => norm(n.item).includes(t) || norm(n.ong).includes(t) || norm(n.categoria).includes(t));
};
