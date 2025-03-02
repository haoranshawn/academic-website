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
    
    const secondaryRedPalette = [
        '#800000', // Maroon
        '#8B0000', // Dark Red
        '#A52A2A', // Brown
        '#B22222', // Firebrick
        '#C41E3A', // Cardinal
        '#DC143C', // Crimson
        '#E60000', // Red
        '#FF0000', // Red
        '#FF4500', // Orange Red
        '#FF6347'  // Tomato
    ];
    
    // Journal analysis data
    const journalData = {
        journalImpactData: [
            { id: 'J001', journal: 'Journal of Strategic...', impact: 18.9, fullName: 'Journal of Strategic Information Systems (JSIS)' },
            { id: 'J002', journal: 'Journal of the Assoc...', impact: 7.4, fullName: 'Journal of the Association for Information Systems (JAIS)' },
            { id: 'J003', journal: 'Journal of Medical I...', impact: 5.8, fullName: 'Journal of Medical Internet Research (JMIR)' },
            { id: 'J004', journal: 'International Journa...', impact: 4.6, fullName: 'International Journal of Medical Informatics(IJMI)' },
            { id: 'J005', journal: 'Journal of the Ameri...', impact: 4.2, fullName: 'Journal of the American Medical Informatics Association (JAMIA)' },
            { id: 'J006', journal: 'Communications of th...', impact: 2.5, fullName: 'Communications of the Association for Information Systems (CAIS)' }
        ],
        rankingData: [
            { id: 'J005', journal: 'Journal of the ...', ranking: 'A', fullName: 'Journal of the American Medical Informatics Association (JAMIA)' },
            { id: 'J004', journal: 'International J...', ranking: 'A', fullName: 'International Journal of Medical Informatics(IJMI)' },
            { id: 'J006', journal: 'Communications ...', ranking: 'A', fullName: 'Communications of the Association for Information Systems (CAIS)' },
            { id: 'J001', journal: 'Journal of Stra...', ranking: 'A*', fullName: 'Journal of Strategic Information Systems (JSIS)' },
            { id: 'J003', journal: 'Journal of Medi...', ranking: 'Q1 (Health Informatics Ranking)', fullName: 'Journal of Medical Internet Research (JMIR)' },
            { id: 'J002', journal: 'Journal of the ...', ranking: 'A*', fullName: 'Journal of the Association for Information Systems (JAIS)' },
            { id: 'J007', journal: 'Journal of the ...', ranking: 'C', fullName: 'Journal of the Midwest Association for Information Systems (JMWAIS)' }
        ],
        acceptanceRateData: [
            { id: 'J001', journal: 'Journal of Strategic...', rate: 0.05, fullName: 'Journal of Strategic Information Systems (JSIS)' },
            { id: 'J002', journal: 'Journal of the Assoc...', rate: 0.12, fullName: 'Journal of the Association for Information Systems (JAIS)' },
            { id: 'J005', journal: 'Journal of the Ameri...', rate: 0.2, fullName: 'Journal of the American Medical Informatics Association (JAMIA)' },
            { id: 'J006', journal: 'Communications of th...', rate: 0.2, fullName: 'Communications of the Association for Information Systems (CAIS)' },
            { id: 'J004', journal: 'International Journa...', rate: 0.25, fullName: 'International Journal of Medical Informatics(IJMI)' },
            { id: 'J003', journal: 'Journal of Medical I...', rate: 0.4, fullName: 'Journal of Medical Internet Research (JMIR)' }
        ],
        reviewTimeData: [
            { id: 'J004', journal: 'International Journa...', minMonths: 2, maxMonths: 5, avgMonths: 3.5, fullName: 'International Journal of Medical Informatics(IJMI)' },
            { id: 'J007', journal: 'Journal of the Midwe...', minMonths: 3, maxMonths: 4, avgMonths: 3.5, fullName: 'Journal of the Midwest Association for Information Systems (JMWAIS)' },
            { id: 'J005', journal: 'Journal of the Ameri...', minMonths: 3, maxMonths: 6, avgMonths: 4.5, fullName: 'Journal of the American Medical Informatics Association (JAMIA)' },
            { id: 'J001', journal: 'Journal of Strategic...', minMonths: 3, maxMonths: 6, avgMonths: 4.5, fullName: 'Journal of Strategic Information Systems (JSIS)' }
        ],
        openAccessData: [
            { id: 'OA', category: 'Open Access', count: 3 },
            { id: 'SUB', category: 'Subscription', count: 4 }
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
                position: 'top',
                align: 'center',
                labels: {
                    boxWidth: 15,
                    boxHeight: 15,
                    padding: 15,
                    usePointStyle: true,
                    font: {
                        size: 11
                    }
                }
            },
            tooltip: {
                padding: 10,
                bodyFont: {
                    size: 12
                },
                titleFont: {
                    size: 13,
                    weight: 'bold'
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                right: 20,
                left: 5,
                top: 10,
                bottom: 10
            }
        }
    };
    
    // Create Journal Impact Factor Chart
    const impactCtx = document.getElementById('journalImpactChart');
    if (impactCtx) {
        new Chart(impactCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: journalData.journalImpactData.map(item => item.journal),
                datasets: [{
                    label: 'Impact Factor',
                    data: journalData.journalImpactData.map(item => item.impact),
                    backgroundColor: journalData.journalImpactData.map((_, index) => redPalette[index % redPalette.length]),
                    borderColor: '#fff',
                    borderWidth: 1
                }]
            },
            options: {
                ...commonOptions,
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Impact Factor',
                            color: '#8B0000',
                            font: {
                                weight: 'bold'
                            },
                            padding: {top: 10, bottom: 10}
                        },
                        ticks: {
                            padding: 5
                        }
                    },
                    y: {
                        ticks: {
                            font: {
                                size: 11
                            },
                            callback: function(value) {
                                const label = this.getLabelForValue(value);
                                return label;
                            }
                        }
                    }
                },
                plugins: {
                    ...commonOptions.plugins,
                    datalabels: {
                        align: 'end',
                        anchor: 'end',
                        formatter: (value) => value.toFixed(1),
                        color: '#333',
                        font: {
                            weight: 'bold'
                        },
                        padding: 5
                    },
                    tooltip: {
                        callbacks: {
                            title: function(context) {
                                const index = context[0].dataIndex;
                                return journalData.journalImpactData[index].fullName;
                            }
                        }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            padding: 15
                        }
                    }
                }
            }
        });
    }
    
    // Create Acceptance Rate Chart
    const acceptanceCtx = document.getElementById('acceptanceRateChart');
    if (acceptanceCtx) {
        new Chart(acceptanceCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: journalData.acceptanceRateData.map(item => item.journal),
                datasets: [{
                    label: 'Acceptance Rate',
                    data: journalData.acceptanceRateData.map(item => item.rate),
                    backgroundColor: journalData.acceptanceRateData.map((_, index) => secondaryRedPalette[index % secondaryRedPalette.length]),
                    borderColor: '#fff',
                    borderWidth: 1
                }]
            },
            options: {
                ...commonOptions,
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 0.5,
                        title: {
                            display: true,
                            text: 'Acceptance Rate',
                            color: '#8B0000',
                            font: {
                                weight: 'bold'
                            },
                            padding: {top: 10, bottom: 10}
                        },
                        ticks: {
                            callback: function(value) {
                                return (value * 100).toFixed(0) + '%';
                            },
                            padding: 5
                        }
                    },
                    y: {
                        ticks: {
                            font: {
                                size: 11
                            },
                            callback: function(value) {
                                const label = this.getLabelForValue(value);
                                return label;
                            }
                        }
                    }
                },
                plugins: {
                    ...commonOptions.plugins,
                    datalabels: {
                        align: 'end',
                        anchor: 'end',
                        formatter: (value) => (value * 100).toFixed(0) + '%',
                        color: '#333',
                        font: {
                            weight: 'bold'
                        },
                        padding: 5
                    },
                    tooltip: {
                        callbacks: {
                            title: function(context) {
                                const index = context[0].dataIndex;
                                return journalData.acceptanceRateData[index].fullName;
                            },
                            label: function(context) {
                                const value = context.parsed.x;
                                return `Acceptance Rate: ${(value * 100).toFixed(0)}%`;
                            }
                        }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            padding: 15
                        }
                    }
                }
            }
        });
    }
    
    // Create Review Time Chart
    const reviewTimeCtx = document.getElementById('reviewTimeChart');
    if (reviewTimeCtx) {
        new Chart(reviewTimeCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: journalData.reviewTimeData.map(item => item.journal),
                datasets: [
                    {
                        label: 'Minimum',
                        data: journalData.reviewTimeData.map(item => item.minMonths),
                        backgroundColor: redPalette[0],
                        borderColor: '#fff',
                        borderWidth: 1
                    },
                    {
                        label: 'Maximum',
                        data: journalData.reviewTimeData.map(item => item.maxMonths),
                        backgroundColor: redPalette[1],
                        borderColor: '#fff',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                ...commonOptions,
                scales: {
                    x: {
                        ticks: {
                            font: {
                                size: 11
                            },
                            callback: function(value) {
                                const label = this.getLabelForValue(value);
                                // Wrap long labels
                                if (label && label.length > 15) {
                                    return label.substr(0, 15) + '...';
                                }
                                return label;
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Months',
                            color: '#8B0000',
                            font: {
                                weight: 'bold'
                            },
                            padding: {top: 0, bottom: 10}
                        },
                        ticks: {
                            padding: 5
                        }
                    }
                },
                plugins: {
                    ...commonOptions.plugins,
                    datalabels: {
                        display: true,
                        align: 'center',
                        anchor: 'center',
                        color: '#fff',
                        font: {
                            weight: 'bold',
                            size: 11
                        }
                    },
                    tooltip: {
                        callbacks: {
                            title: function(context) {
                                const index = context[0].dataIndex;
                                return journalData.reviewTimeData[index].fullName;
                            }
                        }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            padding: 15
                        }
                    }
                }
            }
        });
    }
    
    // Create Open Access vs Subscription Chart
    const openAccessCtx = document.getElementById('openAccessChart');
    if (openAccessCtx) {
        new Chart(openAccessCtx.getContext('2d'), {
            type: 'pie',
            data: {
                labels: journalData.openAccessData.map(item => item.category),
                datasets: [{
                    data: journalData.openAccessData.map(item => item.count),
                    backgroundColor: [redPalette[0], redPalette[1]],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                ...commonOptions,
                plugins: {
                    ...commonOptions.plugins,
                    datalabels: {
                        color: '#fff',
                        anchor: 'center',
                        align: 'center',
                        formatter: (value, ctx) => {
                            const total = ctx.dataset.data.reduce((acc, data) => acc + data, 0);
                            const percentage = ((value / total) * 100).toFixed(1) + '%';
                            return percentage;
                        },
                        font: {
                            weight: 'bold',
                            size: 14
                        },
                        offset: 0
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            boxWidth: 12,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
});
