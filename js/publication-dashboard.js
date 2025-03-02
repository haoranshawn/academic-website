document.addEventListener('DOMContentLoaded', function() {
    // Register Chart.js plugins
    Chart.register(ChartDataLabels);
    
    // Color palette - improved color combination with red as main color
    const redPalette = [
        '#8B0000', // Dark red (main color)
        '#1E3A8A', // Dark blue
        '#3D5A80', // Steel blue
        '#006400', // Dark green
        '#4B0082', // Indigo
        '#5A189A', // Purple
        '#7B3F00', // Brown
        '#1C1C1C', // Dark gray
        '#2D3748', // Slate gray
        '#FF6347'  // Tomato (accent)
    ];
    
    // Publication data with Paper IDs
    const publicationData = {
        statusData: [
            { id: 'P001', status: 'Published', count: 1 },
            { id: 'P002', status: 'Published', count: 1 },
            { id: 'P003', status: 'Published', count: 1 },
            { id: 'P004', status: 'Published', count: 1 },
            { id: 'P005', status: 'Published', count: 1 },
            { id: 'P006', status: 'Published', count: 1 },
            { id: 'P007', status: 'Published', count: 1 },
            { id: 'P008', status: 'Working', count: 1 },
            { id: 'P009', status: 'Working', count: 1 },
            { id: 'P010', status: 'Working', count: 1 },
            { id: 'P011', status: 'Working', count: 1 },
            { id: 'P012', status: 'Rejected', count: 1 },
            { id: 'P013', status: 'Rejected', count: 1 },
            { id: 'P014', status: 'Revision', count: 1 },
            { id: 'P015', status: 'Under Review', count: 1 }
        ],
        documentTypeData: [
            { id: 'P001', type: 'Journal Article', count: 1 },
            { id: 'P002', type: 'Journal Article', count: 1 },
            { id: 'P003', type: 'Journal Article', count: 1 },
            { id: 'P004', type: 'Journal Article', count: 1 },
            { id: 'P005', type: 'Journal Article', count: 1 },
            { id: 'P006', type: 'Journal Article', count: 1 },
            { id: 'P007', type: 'Journal Article', count: 1 },
            { id: 'P008', type: 'Journal Article', count: 1 },
            { id: 'P009', type: 'Conference Proceeding', count: 1 },
            { id: 'P010', type: 'Conference Proceeding', count: 1 },
            { id: 'P011', type: 'Conference Proceeding', count: 1 },
            { id: 'P012', type: 'Conference Proceeding', count: 1 },
            { id: 'P013', type: 'Conference Proceeding', count: 1 },
            { id: 'P014', type: 'Working Paper', count: 1 },
            { id: 'P015', type: 'Working Paper', count: 1 }
        ],
        timelineData: [
            { year: '2017', started: 4, published: 2 },
            { year: '2018', started: 2, published: 0 },
            { year: '2019', started: 3, published: 1 },
            { year: '2020', started: 1, published: 3 },
            { year: '2021', started: 2, published: 0 },
            { year: '2022', started: 0, published: 1 },
            { year: '2023', started: 1, published: 0 },
            { year: '2024', started: 2, published: 0 }
        ],
        statusByYearData: [
            { year: '2017', published: 2, working: 1, rejected: 1, revision: 0, review: 0 },
            { year: '2018', published: 0, working: 1, rejected: 1, revision: 0, review: 0 },
            { year: '2019', published: 1, working: 1, rejected: 0, revision: 1, review: 0 },
            { year: '2020', published: 3, working: 0, rejected: 0, revision: 0, review: 0 },
            { year: '2021', published: 0, working: 1, rejected: 0, revision: 0, review: 1 },
            { year: '2022', published: 1, working: 0, rejected: 0, revision: 0, review: 0 },
            { year: '2023', published: 0, working: 0, rejected: 0, revision: 0, review: 0 },
            { year: '2024', published: 0, working: 0, rejected: 0, revision: 0, review: 0 }
        ],
        // Aggregated data for charts
        aggregatedStatusData: [
            { status: 'Published', count: 7 },
            { status: 'Working', count: 4 },
            { status: 'Rejected', count: 2 },
            { status: 'Revision', count: 1 },
            { status: 'Under Review', count: 1 }
        ],
        aggregatedDocumentTypeData: [
            { type: 'Journal Article', count: 8 },
            { type: 'Conference Proceeding', count: 5 },
            { type: 'Working Paper', count: 2 }
        ]
    };
    
    // Common chart options
    const commonOptions = {
        plugins: {
            datalabels: {
                font: {
                    weight: 'bold',
                    size: 12
                }
            },
            legend: {
                position: 'right',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 12
                    }
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false
    };
    
    // Create Status Distribution Chart
    const statusCtx = document.getElementById('statusChart');
    if (statusCtx) {
        new Chart(statusCtx.getContext('2d'), {
            type: 'pie',
            data: {
                labels: publicationData.aggregatedStatusData.map(item => item.status),
                datasets: [{
                    data: publicationData.aggregatedStatusData.map(item => item.count),
                    backgroundColor: redPalette.slice(0, publicationData.aggregatedStatusData.length),
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                ...commonOptions,
                plugins: {
                    ...commonOptions.plugins,
                    datalabels: {
                        color: '#333',
                        anchor: 'end',
                        align: 'end',
                        offset: 10,
                        formatter: (value, ctx) => {
                            const total = ctx.dataset.data.reduce((acc, data) => acc + data, 0);
                            const percentage = ((value / total) * 100).toFixed(1) + '%';
                            return percentage;
                        },
                        font: {
                            weight: 'bold',
                            size: 12
                        }
                    }
                }
            }
        });
    }
    
    // Create Document Type Distribution Chart
    const documentTypeCtx = document.getElementById('documentTypeChart');
    if (documentTypeCtx) {
        new Chart(documentTypeCtx.getContext('2d'), {
            type: 'pie',
            data: {
                labels: publicationData.aggregatedDocumentTypeData.map(item => item.type),
                datasets: [{
                    data: publicationData.aggregatedDocumentTypeData.map(item => item.count),
                    backgroundColor: redPalette.slice(0, publicationData.aggregatedDocumentTypeData.length),
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                ...commonOptions,
                plugins: {
                    ...commonOptions.plugins,
                    datalabels: {
                        color: '#333',
                        anchor: 'end',
                        align: 'end',
                        offset: 10,
                        formatter: (value, ctx) => {
                            const total = ctx.dataset.data.reduce((acc, data) => acc + data, 0);
                            const percentage = ((value / total) * 100).toFixed(1) + '%';
                            return percentage;
                        },
                        font: {
                            weight: 'bold',
                            size: 12
                        }
                    }
                }
            }
        });
    }
    
    // Create Timeline Chart
    const timelineCtx = document.getElementById('timelineChart');
    if (timelineCtx) {
        new Chart(timelineCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: publicationData.timelineData.map(item => item.year),
                datasets: [
                    {
                        label: 'Started',
                        data: publicationData.timelineData.map(item => item.started),
                        borderColor: redPalette[0],
                        backgroundColor: 'rgba(139, 0, 0, 0.1)',
                        borderWidth: 3,
                        tension: 0.2,
                        fill: true
                    },
                    {
                        label: 'Published',
                        data: publicationData.timelineData.map(item => item.published),
                        borderColor: redPalette[1],
                        backgroundColor: 'rgba(30, 58, 138, 0.1)',
                        borderWidth: 3,
                        tension: 0.2,
                        fill: true
                    }
                ]
            },
            options: {
                ...commonOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                            precision: 0
                        },
                        title: {
                            display: true,
                            text: 'Number of Papers'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        }
                    }
                },
                plugins: {
                    ...commonOptions.plugins,
                    datalabels: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.parsed.y;
                                return `${label}: ${value}`;
                            }
                        },
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        titleFont: {
                            size: 14
                        },
                        bodyFont: {
                            size: 14
                        },
                        padding: 10,
                        color: '#fff'
                    }
                }
            }
        });
    }
    
    // Create Status by Year Chart
    const statusByYearCtx = document.getElementById('statusByYearChart');
    if (statusByYearCtx) {
        new Chart(statusByYearCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: publicationData.statusByYearData.map(item => item.year),
                datasets: [
                    {
                        label: 'Published',
                        data: publicationData.statusByYearData.map(item => item.published),
                        backgroundColor: redPalette[0],
                        stack: 'Stack 0'
                    },
                    {
                        label: 'Working',
                        data: publicationData.statusByYearData.map(item => item.working),
                        backgroundColor: redPalette[1],
                        stack: 'Stack 0'
                    },
                    {
                        label: 'Rejected',
                        data: publicationData.statusByYearData.map(item => item.rejected),
                        backgroundColor: redPalette[2],
                        stack: 'Stack 0'
                    },
                    {
                        label: 'Revision',
                        data: publicationData.statusByYearData.map(item => item.revision),
                        backgroundColor: redPalette[3],
                        stack: 'Stack 0'
                    },
                    {
                        label: 'Under Review',
                        data: publicationData.statusByYearData.map(item => item.review),
                        backgroundColor: redPalette[4],
                        stack: 'Stack 0'
                    }
                ]
            },
            options: {
                ...commonOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        stacked: true,
                        ticks: {
                            stepSize: 1,
                            precision: 0
                        },
                        title: {
                            display: true,
                            text: 'Number of Papers'
                        }
                    },
                    x: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Year'
                        }
                    }
                },
                plugins: {
                    ...commonOptions.plugins,
                    datalabels: {
                        display: function(context) {
                            return context.dataset.data[context.dataIndex] > 0;
                        },
                        formatter: function(value) {
                            return value;
                        },
                        color: '#fff'
                    }
                }
            }
        });
    }
});
