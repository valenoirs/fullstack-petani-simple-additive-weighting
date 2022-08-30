const percent = [15, 15, 20, 50];

function count(arr: any, namaPetani: any) {
  let hasil: any[] = [];

  arr.forEach((element: any, index: any) => {
    let max = Math.max(...arr[index]);
    hasil.push(arr[index].map((e: any) => e / max));
  });

  let output = [];
  let real = 0;

  for (let i = 0; i < hasil[0].length; i++) {
    real = 0;
    for (let j = 0; j < hasil.length; j++) {
      real = real + hasil[j][i] * percent[j];
    }
    if (real < 0) {
      real = 0;
    }
    output.push({ name: namaPetani[i], score: real / 100 });
  }

  return output.sort((a, b) => {
    return b.score - a.score;
  });
}

export default function processArray(arr: any) {
  const result: any[] = [];
  const kriteria: any[] = [];
  const namaPetani: any[] = [];

  arr.forEach((petani: any) => {
    kriteria.push(petani.kriteria);
    namaPetani.push(petani.nama);
  });

  kriteria[0].forEach((element: any, index: any) => {
    result.push(
      kriteria.map((e: any, indexMap: any) => kriteria[indexMap][index])
    );
  });

  const output = count(result, namaPetani);

  return output;
}
