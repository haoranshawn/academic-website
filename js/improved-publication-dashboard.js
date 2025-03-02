document.addEventListener('DOMContentLoaded', function() {
    // Register Chart.js plugins
    Chart.register(ChartDataLabels);
    
    // Color palette - distinctive color palette with better contrast for readability
    const redPalette = [
        '#8B0000', // Dark red (main color)
        '#A52A2A', // Brown
        '#B22222', // Firebrick
        '#CD5C5C', // Indian Red
        '#E34234', // Vermilion
        '#FF0800', // Red
        '#ED2939', // Imperial Red
        '#D70040', // Crimson
        '#FF3030', // Fire Engine Red
        '#F08080'  // Light Coral
    ];
    
    // Grey color for rejected/conference proceedings
    const greyColor = '#808080';
    
    // Text colors for better readability
    const textDark = '#222222';
    const textLight = '#FFFFFF';
    
    // Publication data with Paper IDs
    const publicationData = {
        statusData: [
            { id: 'P001', status: 'Published', count: 1 },
            { id: 'P002', status: 'Published', count: 1 },
            { id: 'P003', status: 'Published', count: 1 },
            { id: 'P004', status: 'Published', count: 1 },
            { id: 'P005', status: 'Published', count: 1 },
            { id: 'P006', status: 'Working', count: 1 },
            { id: 'P007', status: 'Working', count: 1 },
            { id: 'P008', status: 'Rejected', count: 1 },
            { id: 'P009', status: 'Rejected', count: 1 },
            { id: 'P010', status: 'Revision', count: 1 },
            { id: 'P011', status: 'Under Review', count: 1 }
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
            { id: 'P011', type: 'Conference Proceeding', count: 1 }
        ],
        timelineData: [
            { year: '2018', submitted: 2, published: 0 },
            { year: '2019', submitted: 3, published: 1 },
            { year: '2020', submitted: 1, published: 3 },
            { year: '2021', submitted: 2, published: 0 },
            { year: '2022', submitted: 1, published: 1 },
            { year: '2023', submitted: 1, published: 0 },
            { year: '2024', submitted: 2, published: 0 },
            { year: '2025', submitted: 3, published: 0 }
        ],
        statusByYearData: [
            { year: '2018', published: 0, rejected: 1, working: 1, revision: 0, review: 0 },
            { year: '2019', published: 1, rejected: 1, working: 0, revision: 1, review: 0 },
            { year: '2020', published: 3, rejected: 0, working: 0, revision: 0, review: 0 },
            { year: '2021', published: 0, rejected: 0, working: 1, revision: 0, review: 1 },
            { year: '2022', published: 1, rejected: 0, working: 0, revision: 0, review: 0 },
            { year: '2023', published: 0, rejected: 0, working: 1, revision: 0, review: 0 },
            { year: '2024', published: 0, rejected: 0, working: 1, revision: 0, review: 0 },
            { year: '2025', published: 0, rejected: 0, working: 1, revision: 1, review: 1 }
        ],
        // Aggregated data for charts - combining Revision and Under Review
        aggregatedStatusData: [
            { status: 'Published', count: 5 },
            { status: 'Working', count: 2 },
            { status: 'Rejected', count: 2 },
            { status: 'In Review Process', count: 2 } // Combined Revision and Under Review
        ],
        aggregatedDocumentTypeData: [
            { type: 'Journal Article', count: 8 },
            { type: 'Conference Proceeding', count: 3 }
        ]
    };
    
    // Calculate totals for stats
    const totalPublications = publicationData.statusData.length;
    const publishedCount = publicationData.statusData.filter(item => item.status === 'Published').length;
    const inProgressCount = publicationData.statusData.filter(item => 
        ['Working', 'Revision', 'Under Review'].includes(item.status)
    ).length;
    const publicationRate = ((publishedCount / totalPublications) * 100).toFixed(1);
    
    // Update stat values in the DOM
    document.querySelectorAll('.stat-value').forEach(el => {
        const label = el.nextElementSibling.textContent.trim();
        if (label === 'Total Publications') {
            el.textContent = totalPublications;
        } else if (label === 'Published') {
            el.textContent = publishedCount;
        } else if (label === 'In Progress') {
            el.textContent = inProgressCount;
        } else if (label === 'Publication Rate') {
            el.textContent = publicationRate + '%';
        }
    });
    
    // Common chart options with improved styling
    const commonOptions = {
        plugins: {
            datalabels: {
                font: {
                    weight: 'bold',
                    size: 12
                },
                color: textDark,
                padding: 6
            },
            legend: {
                position: 'bottom',
                align: 'center',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 12,
                        weight: 'bold'
                    },
                    generateLabels: function(chart) {
                        const data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            return data.labels.map(function(label, i) {
                                const meta = chart.getDatasetMeta(0);
                                const style = meta.controller.getStyle(i);
                                
                                return {
                                    text: label,
                                    fillStyle: style.backgroundColor,
                                    strokeStyle: style.borderColor,
                                    lineWidth: style.borderWidth,
                                    hidden: !chart.getDataVisibility(i),
                                    index: i
                                };
                            });
                        }
                        return [];
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleFont: {
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 13
                },
                bodySpacing: 5,
                padding: 10,
                displayColors: true,
                usePointStyle: true,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== undefined) {
                            if (context.parsed.y !== undefined) {
                                label += context.parsed.y;
                            } else if (context.parsed !== undefined) {
                                label += context.parsed;
                            }
                        }
                        return label;
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
        // Custom colors for status chart - grey for rejected
        const statusColors = [
            redPalette[0],  // Published - Dark red
            redPalette[2],  // Working - Firebrick
            greyColor,      // Rejected - Grey
            redPalette[4]   // In Review Process - Vermilion
        ];
        
        new Chart(statusCtx.getContext('2d'), {
            type: 'pie',
            data: {
                labels: publicationData.aggregatedStatusData.map(item => item.status),
                datasets: [{
                    data: publicationData.aggregatedStatusData.map(item => item.count),
                    backgroundColor: statusColors,
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: {
                ...commonOptions,
                plugins: {
                    ...commonOptions.plugins,
                    legend: {
                        ...commonOptions.plugins.legend,
                        position: 'bottom'
                    },
                    datalabels: {
                        color: textDark,
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
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
                                const percentage = ((value / total) * 100).toFixed(1) + '%';
                                return `${label}: ${value} papers (${percentage})`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Create Document Type Distribution Chart
    const documentTypeCtx = document.getElementById('documentTypeChart');
    if (documentTypeCtx) {
        // Custom colors for document type chart - grey for conference proceedings
        const docTypeColors = [
            redPalette[0],  // Journal Article - Dark red
            greyColor       // Conference Proceeding - Grey
        ];
        
        new Chart(documentTypeCtx.getContext('2d'), {
            type: 'pie',
            data: {
                labels: publicationData.aggregatedDocumentTypeData.map(item => item.type),
                datasets: [{
                    data: publicationData.aggregatedDocumentTypeData.map(item => item.count),
                    backgroundColor: docTypeColors,
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                ...commonOptions,
                plugins: {
                    ...commonOptions.plugins,
                    legend: {
                        ...commonOptions.plugins.legend,
                        position: 'bottom'
                    },
                    datalabels: {
                        color: textDark,
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
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
                                const percentage = ((value / total) * 100).toFixed(1) + '%';
                                return `${label}: ${value} papers (${percentage})`;
                            }
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
                        label: 'Submitted',
                        data: publicationData.timelineData.map(item => item.submitted),
                        borderColor: redPalette[1],
                        backgroundColor: 'rgba(165, 42, 42, 0.1)',
                        borderWidth: 3,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        tension: 0.1,
                        fill: false
                    },
                    {
                        label: 'Published',
                        data: publicationData.timelineData.map(item => item.published),
                        borderColor: greyColor,
                        backgroundColor: 'rgba(128, 128, 128, 0.1)',
                        borderWidth: 3,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        tension: 0.1,
                        fill: false
                    }
                ]
            },
            options: {
                ...commonOptions,
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Year',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0,
                            stepSize: 1
                        },
                        title: {
                            display: true,
                            text: 'Number of Papers',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    }
                },
                plugins: {
                    ...commonOptions.plugins,
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 12,
                                weight: 'bold'
                            },
                            generateLabels: function(chart) {
                                const datasets = chart.data.datasets;
                                return datasets.map(function(dataset, i) {
                                    return {
                                        text: dataset.label,
                                        fillStyle: dataset.borderColor,
                                        strokeStyle: dataset.borderColor,
                                        lineWidth: dataset.borderWidth,
                                        hidden: !chart.isDatasetVisible(i),
                                        index: i
                                    };
                                });
                            }
                        }
                    },
                    datalabels: {
                        display: function(context) {
                            return context.dataset.data[context.dataIndex] > 0;
                        },
                        formatter: function(value) {
                            return value;
                        },
                        color: textDark,
                        anchor: 'end',
                        align: 'end',
                        offset: 5
                    }
                }
            }
        });
    }
    
    // Create Status by Year Chart
    const statusByYearCtx = document.getElementById('statusByYearChart');
    if (statusByYearCtx) {
        // Update the status by year data to use the same grouping as the status chart
        const updatedStatusByYearData = publicationData.statusByYearData.map(yearData => {
            return {
                year: yearData.year,
                published: yearData.published,
                working: yearData.working,
                rejected: yearData.rejected,
                inReviewProcess: yearData.revision + yearData.review // Combine revision and review
            };
        });
        
        new Chart(statusByYearCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: updatedStatusByYearData.map(item => item.year),
                datasets: [
                    {
                        label: 'Published',
                        data: updatedStatusByYearData.map(item => item.published),
                        backgroundColor: redPalette[0],
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        borderWidth: 1
                    },
                    {
                        label: 'Working',
                        data: updatedStatusByYearData.map(item => item.working),
                        backgroundColor: redPalette[2],
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        borderWidth: 1
                    },
                    {
                        label: 'Rejected',
                        data: updatedStatusByYearData.map(item => item.rejected),
                        backgroundColor: greyColor,
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        borderWidth: 1
                    },
                    {
                        label: 'In Review Process',
                        data: updatedStatusByYearData.map(item => item.inReviewProcess),
                        backgroundColor: redPalette[4],
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                ...commonOptions,
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Year',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        ticks: {
                            precision: 0,
                            stepSize: 1
                        },
                        title: {
                            display: true,
                            text: 'Number of Papers',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    }
                },
                plugins: {
                    ...commonOptions.plugins,
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 12,
                                weight: 'bold'
                            }
                        }
                    },
                    datalabels: {
                        display: function(context) {
                            return context.dataset.data[context.dataIndex] > 0;
                        },
                        formatter: function(value) {
                            return value;
                        },
                        color: textLight,
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            }
        });
    }
});
