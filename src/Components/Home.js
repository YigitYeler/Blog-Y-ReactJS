import React from 'react';
import {Link} from 'react-router-dom';

  
function Home() {
    

  return (
    <div className="container">
       <h1>Anasayfa</h1>
       <div className="row">
            <div className="col-8">
            <div className="card w-75 text-white bg-dark mb-3">
                <div className="card-body">
                    <h5 className="card-title">Blog Sayfama Hoşgeldiniz</h5>
                        <p className="card-text">Tüm blogları görüntülemek için Bloglar'ı Görüntüle'yi tıklayınız.</p>
                        <Link to='/blogs'> 
                        <a   className="btn btn-primary">Bloglar'ı Görüntüle</a>
                        </Link>
                </div>
            </div>
            </div>
            <div className="col-4">
            <div className="card text-white bg-dark mb-3">
                <div className="card-body">
                    <h5 className="card-title">Yazdığım Bloglar</h5>
                    <p className="card-text">Yazdığınız blogları görmek istiyorsanız Bloglarımı Görüntüle'yi tıklayınız</p>
                    <Link to='/myblogs'>
                    <a   className="btn btn-primary">Bloglarımı Görüntüle</a>
                    </Link>
                </div>
            </div>
            </div>
        </div>
      
    </div>
  );
}

export default Home;