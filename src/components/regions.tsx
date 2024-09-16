/* eslint-disable @typescript-eslint/no-explicit-any */
import checkbox from '/checkbox.png'
import { RegionsType } from '../style';


function Regions({region,setRegion,regionsChecked,setRegionsChecked}:RegionsType) {

    const regionCheck = (regionName: string) => {
        setRegionsChecked((prevRegions:any) => {
          if (prevRegions.includes(regionName)) {
            return prevRegions.filter((region:any) => region !== regionName);
          } else {
            return [...prevRegions, regionName];
          }
        });
      };

  return (
    <>
        <div
            className={` w-[731px] bg-[#fff] absolute top-[57px] left-[0] p-[24px] ${
              region ? "" : "hidden"
            } border border-[#dbdbdb] rounded-[10px] `}
          >
            <h1 className=" font-medium text-[16h1x] text-[#021526] " >რეგიონის მიხედვით</h1>
            <div className="grid grid-cols-3 mt-[24px] gap-y-[16px]" >
              <div className='relative flex items-center  '>
                <div className={`w-[20px] h-[20px] absolute border border-[#dbdbdb] rounded-[2px] `} ><img src={checkbox} alt="checkbox" className={regionsChecked.includes('ქართლი')?'':'hidden'} /></div>
                <input
                  type="checkbox"
                  name="ქართლი"
                  id="ქართლი"
                  className="opacity-0 w-[20px] h-[20px] "
                  onChange={() => regionCheck("ქართლი")}
                />
                <label htmlFor="ქართული" className="text-[14px] text-[#021526] ml-[8px]" >ქართული</label>
              </div>
              <div className='relative flex items-center'>
              <div className={`w-[20px] h-[20px] absolute border border-[#dbdbdb] rounded-[2px] `} ><img src={checkbox} alt="checkbox" className={regionsChecked.includes('კახეთი')?'':'hidden'} /></div>
                <input
                  type="checkbox"
                  name="კახეთი"
                  id="კახეთი"
                  className="opacity-0 w-[20px] h-[20px] "
                  onChange={() => regionCheck("კახეთი")}
                />
                <label  className="text-[14px] text-[#021526]  ml-[8px] " htmlFor="კახეთი">კახეთი</label>
              </div>
              <div className='relative flex items-center'>
                <div className={`w-[20px] h-[20px] absolute border border-[#dbdbdb] rounded-[2px] `} ><img src={checkbox} alt="checkbox" className={regionsChecked.includes('იმერეთი')?'':'hidden'} /></div>
                <input
                  type="checkbox"
                  name="იმერეთი"
                  id="იმერეთი"
                  className="opacity-0 w-[20px] h-[20px] "
                  onChange={() => regionCheck("იმერეთი")}
                />
                <label  className="text-[14px] text-[#021526]  ml-[8px] " htmlFor="იმერეთი">იმერეთი</label>
              </div>
              <div className='relative flex items-center'>
                <div className={`w-[20px] h-[20px] absolute border border-[#dbdbdb] rounded-[2px] `} ><img src={checkbox} alt="checkbox" className={regionsChecked.includes('სამეგრელო')?'':'hidden'} /></div>
                <input
                  type="checkbox"
                  name="სამეგრელო"
                  id="სამეგრელო"
                  className="opacity-0 w-[20px] h-[20px] "
                  onChange={() => regionCheck("სამეგრელო")}
                />
                <label  className="text-[14px] text-[#021526]  ml-[8px] " htmlFor="სამეგრელო">სამეგრელო</label>
              </div>
              <div className='relative flex items-center'>
                <div className={`w-[20px] h-[20px] absolute border border-[#dbdbdb] rounded-[2px] `} ><img src={checkbox} alt="checkbox" className={regionsChecked.includes('გურია')?'':'hidden'} /></div>
                <input
                  type="checkbox"
                  name="გურია"
                  id="გურია"
                  className="opacity-0 w-[20px] h-[20px] "
                  onChange={() => regionCheck("გურია")}
                />
                <label  className="text-[14px] text-[#021526]  ml-[8px] " htmlFor="გურია">გურია</label>
              </div>
              <div className='relative flex items-center'>
                <div className={`w-[20px] h-[20px] absolute border border-[#dbdbdb] rounded-[2px] `} ><img src={checkbox} alt="checkbox" className={regionsChecked.includes('რაჟა')?'':'hidden'} /></div>
                <input
                  type="checkbox"
                  name="რაჟა"
                  id="რაჟა"
                  className="opacity-0 w-[20px] h-[20px] "
                  onChange={() => regionCheck("რაჟა")}
                />
                <label  className="text-[14px] text-[#021526]  ml-[8px] " htmlFor="რაჟა">რაჟა</label>
              </div>
              <div className='relative flex items-center'>
                <div className={`w-[20px] h-[20px] absolute border border-[#dbdbdb] rounded-[2px] `} ><img src={checkbox} alt="checkbox" className={regionsChecked.includes('ლეჩხუმი')?'':'hidden'} /></div>
                <input
                  type="checkbox"
                  name="ლეჩხუმი"
                  id="ლეჩხუმი"
                  className="opacity-0 w-[20px] h-[20px] "
                  onChange={() => regionCheck("ლეჩხუმი")}
                />
                <label  className="text-[14px] text-[#021526]  ml-[8px] " htmlFor="ლეჩხუმი">ლეჩხუმი</label>
              </div>
              <div className='relative flex items-center'>
                <div className={`w-[20px] h-[20px] absolute border border-[#dbdbdb] rounded-[2px] `} ><img src={checkbox} alt="checkbox" className={regionsChecked.includes('სამცხე-ჯავახეთი')?'':'hidden'} /></div>
                <input
                  type="checkbox"
                  name="სამცხე-ჯავახეთი"
                  id="სამცხე-ჯავახეთი"
                  className="opacity-0 w-[20px] h-[20px] "
                  onChange={() => regionCheck("სამცხე-ჯავახეთი")}
                />
                <label  className="text-[14px] text-[#021526]  ml-[8px] " htmlFor="სამცხე-ჯავახეთი">სამცხე-ჯავახეთი</label>
              </div>
              <div className='relative flex items-center'>
                <div className={`w-[20px] h-[20px] absolute border border-[#dbdbdb] rounded-[2px] `} ><img src={checkbox} alt="checkbox" className={regionsChecked.includes('აჭარა')?'':'hidden'} /></div>
                <input
                  type="checkbox"
                  name="აჭარა"
                  id="აჭარა"
                  className="opacity-0 w-[20px] h-[20px] "
                  onChange={() => regionCheck("აჭარა")}
                />
                <label  className="text-[14px] text-[#021526]  ml-[8px] " htmlFor="აჭარა">აჭარა</label>
              </div>
              <div className='relative flex items-center'>
                <div className={`w-[20px] h-[20px] absolute border border-[#dbdbdb] rounded-[2px] `} ><img src={checkbox} alt="checkbox" className={regionsChecked.includes('სვანეთი')?'':'hidden'} /></div>
                <input
                  type="checkbox"
                  name="სვანეთი"
                  id="სვანეთი"
                  className="opacity-0 w-[20px] h-[20px] "
                  onChange={() => regionCheck("სვანეთი")}
                />
                <label  className="text-[14px] text-[#021526]  ml-[8px] " htmlFor="სვანეთი">სვანეთი</label>
              </div>
              <div className='relative flex items-center'>
                <div className={`w-[20px] h-[20px] absolute border border-[#dbdbdb] rounded-[2px] `} ><img src={checkbox} alt="checkbox" className={regionsChecked.includes('მცხეთა-მთიანეთი')?'':'hidden'} /></div>
                <input
                  type="checkbox"
                  name="მცხეთა-მთიანეთი"
                  id="მცხეთა-მთიანეთი"
                  className="opacity-0 w-[20px] h-[20px] "
                  onChange={() => regionCheck("მცხეთა-მთიანეთი")}
                />
                <label  className="text-[14px] text-[#021526]  ml-[8px] " htmlFor="მცხეთა-მთიანეთი">მცხეთა-მთიანეთი</label>
              </div>
              <div className='relative flex items-center'>
                <div className={`w-[20px] h-[20px] absolute border border-[#dbdbdb] rounded-[2px] `} ><img src={checkbox} alt="checkbox" className={regionsChecked.includes('თბილისი')?'':'hidden'} /></div>
                <input
                  type="checkbox"
                  name="თბილისი"
                  id="თბილისი"
                  className="opacity-0 w-[20px] h-[20px] "
                  onChange={() => regionCheck("თბილისი")}
                />
                <label  className="text-[14px] text-[#021526]  ml-[8px] " htmlFor="თბილისი">თბილისი</label>
              </div>
            </div>
            <div className=" flex justify-end w-[100%]" >
            <button className="px-[14px] py-[8px] text-[14px] bg-[#f93b1d] rounded-[8px] mt-[32px] self-end " onClick={() => {setRegion(false)}}>
              არჩევა
            </button>
            </div>
          </div>
    </>
  )
}

export default Regions