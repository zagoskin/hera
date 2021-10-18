import React, { useState, useEffect }  from 'react';
import scopusLogo from '../../images/scopusLogo.png';
import poweredByScopus from '../../images/PoweredbyScopus.png'
import Chart from 'react-apexcharts';
// import useScript from '../../hooks/useScript';

export default function ScopusGraph({data}){
  const [optionsSJR, setOptionsSJR] = useState({});
  const [seriesSJR, setSeriesSJR] = useState([]);
  const [optionsSNIP, setOptionsSNIP] = useState({});
  const [seriesSNIP, setSeriesSNIP] = useState([]);
  useEffect(()=> {
    if (data !== null){
      if (data.entry){
        const sjrCategories = data.entry[0].SJRList.SJR.map((item) => (item["@year"]));
        const sjrData = data.entry[0].SJRList.SJR.map((item) => (item["$"]));
        const snipCategories = data.entry[0].SNIPList.SNIP.map((item) => (item["@year"]));
        const snipData = data.entry[0].SNIPList.SNIP.map((item) => (item["$"]));
        setOptionsSJR({
          dataLabels: {
            enabled: true,
            enabledOnSeries: true,
            textAnchor: 'middle',
            distributed: false,
            style: {
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 'bold',
                colors: ['#000'],
            }
          },
          chart: {
            id: "sjr-chart",
            animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 800,
              animateGradually: {
                  enabled: true,
                  delay: 150
              },
              dynamicAnimation: {
                  enabled: true,
                  speed: 350
              }
            },
            toolbar: {
              show: false
            }
          },
          xaxis: {
            categories: sjrCategories,
            labels: {
              show: true,
              style: {
                fontWeight: 'bold'
              }
            }
          },
          yaxis: {
            labels: {
              show: true,
              style: {
                fontWeight: 'bold'
              }
            }
          },
          colors: ['#edcb5c', '#daed5c', '#b5ed5c', '#5ced68', '#5ced9d', '#5cedd2', '#5cd2ed', '#5ca7ed', '#5c66ed','#805ced','#9d5ced','#c65ced','#e85ced','#ed5cbd','#ed5c83'],
          title: {
            text: 'SCImago Journal Rank',
            align: 'center',
            margin: 4,
            offsetY: 15,
            style: {
              fontSize: '14px',
              color: "black",
            },
          }
        });
        setSeriesSJR([
          {
            name: "SJR",
            data: sjrData
          }
        ]);
        setOptionsSNIP({
          dataLabels: {
            enabled: true,
            enabledOnSeries: true,
            textAnchor: 'middle',
            distributed: false,
            style: {
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 'bold',
                colors: ['#000'],
            }
          },
          chart: {
            id: "snip-chart",
            animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 800,
              animateGradually: {
                  enabled: true,
                  delay: 150
              },
              dynamicAnimation: {
                  enabled: true,
                  speed: 350
              }
            },
            toolbar: {
              show: false
            }
          },
          xaxis: {
            categories: snipCategories,
            labels: {
              show: true,
              style: {
                fontWeight: 'bold'
              }
            }
          },
          yaxis: {
            labels: {
              show: true,
              style: {
                fontWeight: 'bold'
              }
            }
          },
          colors: ['#edcb5c', '#daed5c', '#b5ed5c', '#5ced68', '#5ced9d', '#5cedd2', '#5cd2ed', '#5ca7ed', '#5c66ed','#805ced','#9d5ced','#c65ced','#e85ced','#ed5cbd','#ed5c83'],
          title: {
            text: 'Source Normalized Impact per Paper',
            align: 'center',
            margin: 4,
            offsetY: 15,
            style: {
              fontSize: '14px',
              color: "black",
            }
          },
        });
        setSeriesSNIP([
          {
            name: "SNIP",
            data: snipData
          }
        ]);
      }
    }
  }, [data]);  

  return (
    <div className="card--scopus">
        <div className="card--image--container">
          <a href={data === null ? `https://www.scopus.com/home.uri`
            : data.entry[0].link[0]['@href'] }>
            <img className="card--scopus--image"
              src={scopusLogo}
              alt='scopus_image'
            />
          </a>
        </div>
        <div className="card--data--container">
        {data === null ?
            <div className="card--doaj--text--warning"> No indexado en Scopus</div>
         
          : 
          <div className="card--scopus--info">
            {/* <div className="card--scopus--text">Métricas de este Jornal en Scopus</div> */}
            <div className="card--scopus--citescore">
              CiteScore
              <br />
              <a href={data.entry[0].link[0]["@href"]}>{data.entry[0].citeScoreYearInfoList.citeScoreCurrentMetric} - {data.entry[0].citeScoreYearInfoList.citeScoreCurrentMetricYear}</a>
            </div>
            <div className="card--scopus--citescore">
              CiteScore Tracker
              <br />
              <a href={data.entry[0].link[0]["@href"]}>{data.entry[0].citeScoreYearInfoList.citeScoreTracker} - {data.entry[0].citeScoreYearInfoList.citeScoreTrackerYear}</a>
            </div>
            <div className="card--scopus--chart">
              <Chart
                options={optionsSJR}
                series={seriesSJR}
                type="bar"
                width="300"
              />
            </div>
            <div className="card--scopus--chart">
              <Chart
                  options={optionsSNIP}
                  series={seriesSNIP}
                  type="bar"
                  width="300"
               />
            </div>
            <div className="card--scopus--disclaimer">
              <div className="card--scopus--disclaimer--text">SCImago Journal Rank (SJR) is a measure of scientific 
              influence of scholarly journals that accounts for both 
              the number of citations received by a journal and the importance or 
              prestige of the journals where such citations come from.
              </div>
             
              <div className="card--scopus--disclaimer--text">Source Normalized Impact per Paper (SNIP) measures 
              contextual citation impact by weighting citations 
              based on the total number of citations in a subject field.
              </div>
              <img className="card--scopus--powered"
                src={poweredByScopus}
                alt='powered_by_scopus'
              />   

              <div className="card--scopus--disclaimer--links">
              More information regarding the values can be found in 
                <a href="http://www.journalmetrics.com/sjr.php"> http://www.journalmetrics.com/sjr.php </a> 
                and 
                <a href="http://www.journalmetrics.com/snip.php"> http://www.journalmetrics.com/snip.php </a> 
                <br />
              In addition, more information about the journal in Scopus can be found following the next link
                <a href="https://api.elsevier.com/content/serial/title/issn/2442-6571"> https://api.elsevier.com/content/serial/title/issn/2442-6571 </a> 
              </div>
            </div>
          </div>
        }
        </div>       
    </div>
  )
}