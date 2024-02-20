
const FilteringBar = ({ categories, brands,category, brand,setBrand, setCategory,price,setPrice }) => {
    

  const applyCategory = (e) => {
   const categoryChecked=e.target.value
   if(e.target.checked){
    setCategory([...category,categoryChecked])
   }else{
    setCategory(category.filter(cat => cat !== categoryChecked));
   }
  }

  const applyBrand = (e) => {
    const brandChecked=e.target.value
   if(e.target.checked){
    setBrand([...brand,brandChecked])
   }else{
    setBrand(brand.filter(brand => brand !== brandChecked));
   }
  }

  return (
    <div className="">
      <div className="bg-black w-full text-white px-4 py-2">
        <label htmlFor="Kids">Category</label>
      </div>
      <div className="bg-white w-full" >
        {categories?.map((cat:string, index:number) => (
          <span className=" flex gap-2 items-center  p-4 border w-full" key={index} >
            <input type="checkbox" value={cat} className='w-10 h-5' id={`cat${index}`}
             onClick={applyCategory} checked={category.includes(cat)} />
            <label htmlFor={`cat${index}`} >{cat}</label>
          </span>
        ))}
      </div>
      <div className="bg-black w-full text-white px-4 py-2">
        <label htmlFor="Kids">Brand</label>
      </div>
      <div className="bg-white w-full" >
        {brands?.map((br:  string, index: number) => (
          <span className=" flex gap-2 items-center  p-4 border w-full" key={index}>
            <input type="checkbox" value={br} className='w-10 h-5' id={`brand${index}`} 
            checked={brand.includes(br)}
            onClick={applyBrand}
            />
            <label htmlFor={`brand${index}`} >{br}</label>
          </span>
        ))}
      </div>
      <div className="bg-black w-full text-white px-4 py-2">
        <label htmlFor="Kids">Price</label>
      </div>
      <div className="bg-white w-full">
      <span className=" flex gap-2 items-center  p-4 border w-full">
          <input type="checkbox" className='w-10 h-5' onClick={()=>setPrice(1000)} checked={price == 1000}/>
          <label >All</label>
        </span>
        <span className=" flex gap-2 items-center  p-4 border w-full">
          <input type="checkbox" className='w-10 h-5' onClick={()=>setPrice(0)}  checked={price == 0}/>
          <label >Less than 100</label>
        </span>
        <span className=" flex gap-2 items-center  p-4 border w-full">
          <input type="checkbox" className='w-10 h-5' onClick={()=>setPrice(101)}  checked={price == 101}/>
          <label >Between 101 and 199</label>
        </span>
        <span className=" flex gap-2 items-center  p-4 border w-full">
          <input type="checkbox" className='w-10 h-5' onClick={()=>setPrice(200)}  checked={price == 200}/>
          <label >More than 200</label>
        </span>
      </div>
      <div className="bg-black w-full text-white px-4 py-2">
        <label htmlFor="Kids">Total Reviews</label>
      </div>
    </div>
  );
};

export default FilteringBar;