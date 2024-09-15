import logo from '/LOGO-02 3 (1).png'

function Header() {
  return (
    <header className='flex h-[100px] items-center pl-[162px] border-b border-b-[#dbdbdb] ' >
        <img src={logo} alt="logo" />
    </header>
  )
}

export default Header