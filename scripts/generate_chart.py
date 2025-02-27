import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# Set the style
plt.style.use('default')
sns.set_style("whitegrid")

# Create the data
data = {
    'Course': ['Bus Analytics', 'Bus Analytics', 'Capstone', 'Capstone', 'Data Visual', 'Data Visual', 
              'Data Visual', 'Data Visual', 'Data Visual', 'Data Visual', 'Data Visual', 'Data Visual',
              'Intro to Bus', 'Intro to Bus', 'Intro to Bus', 'Intro to Bus', 'Intro to Bus', 'Intro to Bus',
              'Intro to Bus', 'Intro to Bus', 'Intro to Bus', 'Intro to Bus', 'Intro to Bus', 'Intro to Bus',
              'Machine Learn', 'Machine Learn', 'Machine Learn', 'Machine Learn', 'Machine Learn', 'Machine Learn',
              'Machine Learn', 'Machine Learn', 'Machine Learn'],
    'Overall Value Course': [4.4, 4.8, 4.9, 5.0, 4.8, 4.8, 4.6, 4.8, 4.4, 5.0, 4.4, 4.5, 4.2, 4.3, 4.2, 4.4,
                           4.3, 4.2, 4.0, 4.6, 4.3, 4.2, 4.5, 4.0, 4.0, 4.1, 4.5, 4.2, 4.6, 4.7, 4.3, 4.0, 3.1],
    'Overall Evaluation Instructor': [4.3, 4.3, 4.9, 5.0, 4.7, 4.7, 4.8, 4.8, 4.1, 5.0, 4.5, 4.5, 4.2, 3.9,
                                    3.9, 4.4, 4.0, 4.2, 4.0, 4.3, 4.3, 4.1, 4.3, 3.6, 4.0, 3.6, 4.4, 4.4,
                                    4.5, 4.7, 4.4, 4.6, 3.1],
    'Instructor Expertise': [4.5, 4.4, 4.8, 5.0, 4.7, 4.7, 4.6, 4.8, 4.3, 5.0, 4.6, 4.7, 4.4, 4.7, 4.3,
                           4.5, 4.4, 4.4, 4.7, 4.4, 4.4, 4.6, 4.6, 4.5, 4.6, 4.1, 4.5, 4.6, 4.6, 4.7,
                           4.6, 4.6, 4.5],
    'Increased Interest': [4.3, 4.3, 4.8, 4.8, 4.7, 4.7, 4.4, 4.7, 4.4, 4.0, 4.3, 4.5, 3.8, 4.4, 4.0,
                          4.1, 4.0, 3.8, 3.3, 3.9, 4.0, 3.9, 4.4, 3.5, 3.8, 3.1, 4.0, 3.9, 4.5, 4.0,
                          4.4, 3.6, 3.8],
    'Increased Knowledge': [4.5, 4.7, 4.8, 4.8, 4.7, 4.7, 4.8, 4.8, 4.6, 5.0, 4.4, 4.5, 4.2, 4.5, 4.2,
                           4.5, 4.3, 4.2, 4.0, 4.6, 4.3, 4.1, 4.3, 4.0, 4.0, 3.9, 4.2, 4.4, 4.5, 4.7,
                           4.3, 4.2, 3.7]
}

# Create DataFrame and calculate means
df = pd.DataFrame(data)
course_means = df.groupby('Course').mean()

# Prepare data for plotting
metrics = ['Overall Value Course', 'Overall Evaluation Instructor', 'Instructor Expertise', 
          'Increased Interest', 'Increased Knowledge']
labels = ['Overall Value', 'Instructor Evaluation', 'Expertise', 'Interest', 'Knowledge']

# Set up the plot with a larger figure size
plt.figure(figsize=(24, 15))

# Set bar width and positions
bar_width = 0.15
r = np.arange(len(course_means.index))

# Create color palette
colors = ['#CD5C5C', '#4682B4', '#66CDAA', '#DEB887', '#9370DB']  # Indian Red, Steel Blue, Medium Aquamarine, Burlywood, Medium Purple

# Create bars
for idx, (metric, label, color) in enumerate(zip(metrics, labels, colors)):
    bars = plt.bar(r + bar_width * idx, course_means[metric], bar_width, 
                   label=label, color=color, alpha=0.85)  # Slightly reduced alpha for softer look
    
    # Add value labels on top of bars with larger font size
    for bar in bars:
        height = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2, height,
                f'{height:.1f}',
                ha='center', va='bottom', fontsize=24)

# Customize the plot
plt.xlabel('Courses', fontsize=28, labelpad=15)
plt.ylabel('Average Score (out of 5)', fontsize=28, labelpad=15)
plt.title('Course Evaluation Metrics Comparison', fontsize=32, pad=20)

# Set x-axis ticks
plt.xticks(r + bar_width * 2, course_means.index, rotation=0, fontsize=26)

# Set y-axis with whole number increments
plt.yticks(range(1, 6), fontsize=26)

# Add gridlines
plt.grid(True, axis='y', alpha=0.3, linestyle='--')

# Set y-axis limits with whole numbers
plt.ylim(1, 6)

# Adjust legend with proportional font size
plt.legend(bbox_to_anchor=(0.5, -0.12), loc='upper center', 
          ncol=len(metrics), fontsize=26, borderaxespad=0)

# Adjust layout to prevent label cutoff
plt.tight_layout()

# Save the plot with more padding for the legend
plt.savefig('../assets/images/course_evaluation_metrics.png', 
            dpi=300, bbox_inches='tight', pad_inches=0.5)
