import Link from 'next/link'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import ImageLoader from '../ImageLoader'
import StarRating from '../StarRating'

const CityGuideAccountHeader = ({ breadcrumb }) => (
  <>
    <Breadcrumb className='mb-4 pt-2 pt-lg-3 GmarketSansMedium'>
      <Breadcrumb.Item linkAs={Link} href='/city-guide'>Home</Breadcrumb.Item>
      <Breadcrumb.Item linkAs={Link} href='/city-guide/account-info'>회원정보</Breadcrumb.Item>
      <Breadcrumb.Item active>{breadcrumb}</Breadcrumb.Item>
    </Breadcrumb>

    <div className='d-flex align-items-center justify-content-between pb-4 mb-2 GmarketSansMedium'>
      <div className='d-flex align-items-center'>
        <div className='position-relative flex-shrink-0' style={{width: '100px'}}>
          <ImageLoader
            src='/images/avatars/29.png'
            width={200}
            height={200}
            alt='Annette Black'
            className='rounded-circle border border-white'
          />
          <OverlayTrigger
            placement='top'
            overlay={<Tooltip>프로필 변경</Tooltip>}
          >
            <Button size='xs' variant='icon btn-light rounded-circle shadow-sm position-absolute end-0 bottom-0'>
              <i className='fi-pencil fs-xs'></i>
            </Button>
          </OverlayTrigger>
        </div>
        <div className='ps-3 ps-sm-4'>
          <h3 className='h4 mb-2'>회원이름</h3>
          <StarRating rating={4.8} />
        </div>
      </div>
      <Link href='/signin-light' className='nav-link p-0 d-none d-md-block'>
        <i className='fi-logout mt-n1 me-2'></i>
        로그아웃
      </Link>
    </div>
  </>
)

export default CityGuideAccountHeader
