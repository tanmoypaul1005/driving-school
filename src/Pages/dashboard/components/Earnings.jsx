/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import SelectInput from '../../../Components/Input/SelectInput';
import useDashboardStore, { getIncomeChart } from '../../../App/Stores/dashboardStore';
import { useEffect } from 'react';
import { formatDate } from '../../../App/Utility/UtilityFunctions';
import { useTranslation } from 'react-i18next';

const Earnings = () => {

    const { t } = useTranslation();

    const { incomeChartData, chart_value, setChart_value } = useDashboardStore();

    const lang_code = localStorage.getItem("lang_code");

    const chart_data = incomeChartData?.earn?.map((obj, index) => (
        {
            ...obj,
            previous_earn: incomeChartData?.previous_earn?.find(i => i?.name === obj?.name)?.earn,
            month_date: index + 1,
            month: new Date(obj?.date)?.toLocaleString(lang_code?lang_code:'en', { month: 'short' })
        }
    ));

    useEffect(() => {
        setChart_value('weekly')
    }, [])

    const dataArray = [
        {
            title: t("Weekly"),
            value: 'weekly',
            selected: chart_value === 'weekly' ? true : false
        }, {
            title: t("Monthly"),
            value: "monthly",
            selected: chart_value === 'monthly' ? true : false,
        },
        {
            title: t("Yearly"),
            value: "yearly",
            selected: chart_value === 'yearly' ? true : false,
        },
    ]

    useEffect(() => {
        fetchIncomeChart();
    }, [])

    const fetchIncomeChart = async() => {
        await getIncomeChart();
    }

    const CustomXAxisTick = ({ x, y, payload }) => (
        <text x={x} y={y} dy={16} textAnchor="middle" fontSize={14} fill="#666">
            {payload.value.split('-')[2]}
        </text>
    );

    const CustomTickFormatter = (value) => {
        const day = parseInt(value.split('-')[0], -1);
        return day >= 0 && day <= 31 ? value : '';
    };

    const CustomYAxisTick = (props) => {
        const { x, y, payload } = props;
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={-10} y={0} dy={0} textAnchor="end" width={10} fill="#666" fontSize={14}>
                    {payload.value?.toLocaleString("da-DK")}
                </text>
            </g>
        );
    };


    return (
        <div className="w-full bg-cBrandColor2 rounded-br8 ">
            <div className="flex items-center justify-between p-s20">
                <span className='font-fw600 text-fs20 text-cText'>{t("Earnings")} (DKK)</span>
                <div className="flex space-x-5">
                    <div className="flex space-x-2">
                        <div className="mt-s4 bg-cGrayishBlue w-s10 h-s10"></div>
                        <div className="text-fs14 font-fw600 text-cBlack">{t("Last year")}</div>
                    </div>
                    <div className="flex space-x-2">
                        <div className="mt-s4 bg-cBrandColor w-s10 h-s10"></div>
                        <div className="text-fs14 font-fw600 text-cBlack">{t("Current Year")}</div>
                    </div>
                </div>
                <SelectInput
                    placeholder={t('Choice Type')}
                    placeholderClick={async () => {
                        await setChart_value('weekly');
                        await getIncomeChart('weekly');
                        console.log("");
                    }}
                    selectOptionOnChange={async(e) => {
                        await getIncomeChart(e)
                        await setChart_value(e);
                        console.log("")
                        // if (e === 'monthly') setChart_data(chart_month_data);
                        // else if (e === "weekly") setChart_data(week_data);
                        // else if (e === "yearly") setChart_data(chart_yearly_data);
                        // else setChart_data(week_data);
                    }}
                    dataArray={dataArray}
                    padding="px-2" textSize="text-fs14"
                    height="h-[30px]"
                />
            </div>
            <div className={`pb-s15 pl-s20`} style={{ width: '100%', display: 'flex', flexDirection: 'column', height: '40vh' }}>
                <ResponsiveContainer>
                    <AreaChart data={chart_data} stackOffset="expand"
                        margin={{ top: 5, right: 20, left: 20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="95%" stopColor="#C0C0C0" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#C0C0C0" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="95%" stopColor="#96C0FF" stopOpacity={0.2} />
                                <stop offset="95" stopColor="#96C0FF" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        {
                            (chart_value === 'weekly' && 'name') ||
                                (chart_value === 'yearly' && 'month') ?
                                <XAxis dataKey={
                                    (chart_value === 'weekly' && 'name') ||
                                    (chart_value === 'yearly' && 'month')
                                } /> :
                                <XAxis dataKey={'date'} tick={<CustomXAxisTick />} tickFormatter={CustomTickFormatter} />
                        }
                        <YAxis
                            tick={CustomYAxisTick}
                            type="number"
                        />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="previous_earn" stroke="#606470" fillOpacity={10} fill="url(#colorUv)" />
                        <Area type="monotone" dataKey="earn" stroke="#2257AA" fillOpacity={10} fill="url(#colorPv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Earnings;

const CustomTooltip = ({ active, payload }) => {

    const { t } = useTranslation();

    const { chart_value } = useDashboardStore();

    if (active && payload && payload.length) {

        return (
            <div className="shadow-2xl custom-tooltip p-s10 rounded-br4">
                {chart_value === 'weekly' && payload[0]?.payload?.name}
                {chart_value === 'monthly' && formatDate(payload[0]?.payload?.date)}
                {chart_value === 'yearly' && payload[0]?.payload?.month}
                <p>{t("Earnings")}: {payload[0]?.payload?.earn?.toLocaleString("da-DK")}</p>
                <p>{t("Last Year Earn")}: {payload[0]?.payload?.previous_earn?.toLocaleString("da-DK")}</p>
            </div>
        );
    }
    return null;
};