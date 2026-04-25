export interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
  desc: string;
}

export const defaultServices: Service[] = [
  {
    id: '1',
    name: 'Swedish Relaxation',
    duration: '60 / 90 min',
    price: '$95 / $130',
    desc: 'Gentle, flowing strokes to ease tension and restore calm throughout the whole body.',
  },
  {
    id: '2',
    name: 'Deep Tissue',
    duration: '60 / 90 min',
    price: '$110 / $150',
    desc: 'Targeted pressure on chronic muscle tension and adhesions for lasting relief.',
  },
  {
    id: '3',
    name: 'Hot Stone Ritual',
    duration: '90 min',
    price: '$165',
    desc: 'Warmed basalt stones melt away stress while balancing energy through the body.',
  },
  {
    id: '4',
    name: 'Prenatal Massage',
    duration: '60 min',
    price: '$105',
    desc: 'Specially adapted techniques to support comfort and well-being throughout pregnancy.',
  },
  {
    id: '5',
    name: 'Aromatherapy Massage',
    duration: '60 / 90 min',
    price: '$115 / $150',
    desc: 'Swedish techniques enhanced with therapeutic-grade essential oils for full sensory restoration.',
  },
  {
    id: '6',
    name: 'Craniosacral Therapy',
    duration: '60 min',
    price: '$130',
    desc: 'Subtle touch at the skull and sacrum to release the deepest layers of tension and stress.',
  },
];
