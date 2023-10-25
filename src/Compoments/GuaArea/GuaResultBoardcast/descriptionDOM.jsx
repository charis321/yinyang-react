export const getZhouyiDOM=(gua, alter_gua, data, description)=>{
    let content;
    switch(description.type){
        case 0:
          content = data[gua.name]['gua_explain']
          break
        case 1:
          content = data[gua.name]['yao_explain'][gua.alter_yao[0]]
          break
        case 2:
          content = [data[gua.name]['yao_explain'][gua.alter_yao[1]],
                     data[gua.name]['yao_explain'][gua.alter_yao[0]]]
          break
        case 3:
          content = [data[gua.name]['gua_explain'],
                     data[alter_gua.name]['gua_explain']]
          break
        case 4:
          content = [data[gua.name]['yao_explain'][gua.alter_yao[0]],
                     data[gua.name]['yao_explain'][gua.alter_yao[1]]]
          break
        case 5:
          content = data[alter_gua.name]['yao_explain'][alter_gua.normal_yao[0]]
          break
        case 6:
          if(gua.name==="乾"||gua.name==="坤"){
            content = data[gua.name]['yao_explain'][6]
          }else{
             content = data[alter_gua.name]['gua_explain']
          }
          break
        default:
          break
    }
    if(Array.isArray(content)){
        return <div className='gua-describe'>
                    <h2 className='gua-describe-info'>{description.describe}</h2>
                    <div className='gua-describe-content'>
                        <strong className='gua-describe-title'>{content[0].title}</strong>
                        {   
                            content[0].content.map(content_text=>{
                                return <p>{content_text}</p>
                            })
                        }
                        <hr/>
                        <strong className='gua-describe-title'>{content[1].title}</strong>
                        {
                            content[1].content.map(content_text=>{
                                return <p>{content_text}</p>
                            })
                        }
                    </div>
                </div>
    }else{
        return  <div className='gua-describe'>
                    <h2 className='gua-describe-info'>{description.describe}</h2>
                    <div className='gua-describe-content'>
                        <strong className='gua-describe-title'>{content.title}</strong>
                        {
                            content.content.map(content_text=>{
                                return <p>{content_text}</p>
                        })
                        }
                    </div>
                </div>
    }
}
export const getJiaoDOM=(gua, alter_gua, data)=>{
  const content = data[gua.name][alter_gua.name]
  console.log(content)
  return <div className='gua-describe'>
            <div className='gua-describe-content'>
                <strong className='gua-describe-title'>{content.name_complete}</strong>
                <p>{content.content}</p>
            </div>
        </div>
}