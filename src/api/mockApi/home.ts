export const getTableData = () => {
    return {
        code: 200,
        data: {
            tableData: [
                {
                    name: "三星",
                    todayBuy: 350,
                    monthBuy: 3000,
                    totalBuy: 22000
                },
                {
                    name: "华为",
                    todayBuy: 3500,
                    monthBuy: 300000,
                    totalBuy: 2200000
                },
                {
                    name: "小米",
                    todayBuy: 3500,
                    monthBuy: 30000,
                    totalBuy: 220000
                },
                {
                    name: "魅族",
                    todayBuy: 350,
                    monthBuy: 300,
                    totalBuy: 2200
                },
                {
                    name: "vivo",
                    todayBuy: 250,
                    monthBuy: 300,
                    totalBuy: 2200
                },
                {
                    name: "oppo",
                    todayBuy: 250,
                    monthBuy: 200,
                    totalBuy: 1200
                }
            ]
        }
    }
}

export const getCardsData = ()=>{
    return {
        code:200,
        data() {
            cardsData:[
                {
                    count:20,
                    des:"今日消费"
                },
                {
                    count:200,
                    des:"昨日消费"
                },
                {
                    count:500,
                    des:"周消费"
                },
                {
                    count:2000,
                    des:"月消费"
                },
                {
                    count:12000,
                    des:"今年目前消费"
                },
                {
                    count:60000,
                    des:"预计今年消费"
                }
                
            ]
        }
    }
}
