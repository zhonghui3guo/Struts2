$(document).ready(function() {
			options = {
				seriesColors : [ "#4bb2c5", "#c5b47f", "#EAA228", "#579575",
						"#839557", "#958c12", "#953579", "#4b5de4", "#d8b83f",
						"#ff5800", "#0085cc" ], // 默认显示的分类颜色，
				// 如果分类的数量超过这里的颜色数量，则从该队列中第一个位置开始重新取值赋给相应的分类
				stackSeries : false, // 如果置为true并且有多个分类（如果是折线图，就必须多于一条折线），
				// 那么每个分类（折线）在纵轴上的值为其前所有分类纵轴值总和与其纵
				// 轴值相加值（eg,当前分类纵轴值为Y3
				// ，其前有Y2,Y1，那么他显示在Y轴上值为Y2+Y3+Y1,目前该属性支持线图和柱状图
				title : '', // 设置当前图的标题
				title : 
				{
					text : '', // 设置当前图的标题
					show : true// 设置当前标题是否显示
				},
				axisDefaults : 
				{
					show : false, // wether or not to renderer the axis.Determined automatically.
					min : null, // 横（纵）坐标显示的最小值
					max : null, // 横（纵）坐标显示的最大值
					pad : 1.2, // 一个相乘因子，// （数据在横（纵）轴上最大值-数据在横（纵）轴上最小值）*pad值=该轴显示的横（纵）坐标区间长度
					// 该轴显示的横（纵）坐标区间长度=横（纵）坐标显示的最大值-横（纵）坐标显示的最小值
					// 如果设置了max和min的值的话，那么会优先考虑min和max设置的值
					ticks : [], // 设置横（纵）坐标的刻度上的值，可为该ticks数组中的值，
					// a 1D [val1, val2, ...], or 2D [[val, label], [val,
					numberTicks : undefined, // 一个相除因子，用于设置横（纵）坐标刻度间隔// 横（纵）坐标刻度间隔值=横（纵）坐标区间长度/(numberTicks-1)
					tickInterval : '', // 横（纵）坐标刻度间隔值，可为日期字符串
					renderer : $.jqplot.LinearAxisRenderer, // 设置横（纵）轴上数据加载的渲染器,有dateAxisRenderer（参见本文最后相关介绍）
					rendererOptions : {}, // 设置renderer的Option配置对象，线状图不需要设置
					// 不同图表的Option配置对象请参见下面《jqPlot各个不同插件的Option对象设置》
					
					// 中各个图表的配置Option对象
					tickOptions : 
					{
						mark : 'outside', // 设置横（纵）坐标刻度在坐标轴上显示方式，分为坐标轴内，外，穿过坐标轴显示// 值也分为：'outside', 'inside' 和 'cross',
						showMark : true, // 设置是否显示刻度
						showGridLine : true, // 是否在图表区域显示刻度值方向的网格线
						markSize : 4, // 每个刻度线顶点距刻度线在坐标轴上点距离（像素为单位）// 如果mark值为 'cross', 那么每个刻度线都有上顶点和下顶点，刻度线与坐标轴// 在刻度线中间交叉，那么这时这个距离×2,
						show : true, // 是否显示刻度线，与刻度线同方向的网格线，以及坐标轴上的刻度值
						showLabel : true, // 是否显示刻度线以及坐标轴上的刻度值
						formatString : '', // 梃置坐标轴上刻度值显示格式，eg:'%b %#d,// %Y'表示格式"月 日，年"，"AUG 30,2008"
						fontSize : '10px', // 刻度值的字体大小
						fontFamily : 'Tahoma', // 刻度值上字体
						angle : 40, // 刻度值与坐标轴夹角，角度为坐标轴正向顺时针方向
						fontWeight : 'normal', // 字体的粗细
						fontStretch : 1// 刻度值在所在方向（坐标轴外）上的伸展(拉伸)度
					},
					showTicks : true, // / 是否显示刻度线以及坐标轴上的刻度值
					showTickMarks : true, // 设置是否显示刻度
					useSeriesColor : true// 如果有多个纵（横）坐标轴，通过该属性设置这些坐标轴是否以不同颜色显示
				},

				axes : 
				{
					xaxis : 
					{
						// 设置同 axisDefaults
					},
					yaxis : 
					{
						// 设置同 axisDefaults
					},
					x2axis :
					{
						// 设置同 axisDefaults
					},
					y2axis :
					{
						// 设置同 axisDefaults
					}
				},
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				seriesDefaults : 
				{ // 如果有多个分类，这可通过该配置属性设置各个分类的共性属性
					show : true, // 设置是否渲染整个图表区域（即显示图表中内容）
					xaxis : 'xaxis', // either 'xaxis' or 'x2axis'.
					yaxis : 'yaxis', // either 'yaxis' or 'y2axis'.
					label : '', // 用于显示在分类名称框中的分类名称
					color : '', // 分类在图标中表示（折现，柱状图等）的颜色
					lineWidth : 2.5, // 分类图（特别是折线图）哪宽度
					shadow : true, // 各图在图表中是否显示阴影区域
					shadowAngle : 45, // 参考grid中相同参数
					shadowOffset : 1.25, // 参考grid中相同参数
					shadowDepth : 3, // 参考grid中相同参数
					shadowAlpha : 0.1, // 参考grid中相同参数
					showLine : true, // 是否显示图表中的折线（折线图中的折线）
					showMarker : true, // 是否强调显示图中的数据节点
					fill : false, // 是否填充图表中折线下面的区域（填充颜色同折线颜色）以及legend
					// 设置的分类名称框中分类的颜色，此处注意的是如果fill为true， 那么showLine必须为true，否则不会显示效果
					fillAndStroke : false, // 在fill为true的状态下，在填充区域最上面显示一条线（如果是折线图则显示该折线）
					fillColor : undefined, // 设置填充区域的颜色
					fillAlpha : undefined, // 梃置填充区域的透明度
					renderer : $.jqplot.PieRenderer, // 利用渲染器（这里是利用饼图PieRenderer）渲染现有图表
					// ，从而转换成所需图表
					rendererOptions : {}, // 传给上个属性所设置渲染器的option对象，线状图的渲染器没有option对象，
					// 不同图表的Option配置对象请参见下面《jqPlot各个不同插件的Option对象设置》
					// 中各个图表的配置Option对象
					markerRenderer : $.jqplot.MarkerRenderer, // renderer to// use to draw// the data
					// point markers.
					markerOptions : 
					{
						show : true, // 是否在图中显示数据点
						style : 'filledCircle', // 各个数据点在图中显示的方式，默认是"filledCircle"(实心圆点),
						// 其他几种方式circle，diamond, square, filledCircle，
						// filledDiamond or filledSquare.
						lineWidth : 2, // 数据点各个的边的宽度（如果设置过大，各个边会重复，会显示的类似于实心点）
						size : 9, // 数据点的大小
						color : "#666666", // 数据点的颜色
						shadow : true, // 是否为数据点显示阴影区（增加立体效果）
						shadowAngle : 45, // 阴影区角度，x轴顺时针方向
						shadowOffset : 1, // 参考grid中相同参数
						shadowDepth : 3, // 参考grid中相同参数
						shadowAlpha : 0.07// 参考grid中相同参数
					},
					isDragable : true// 是否允许拖动（如果dragable包已引入）,默认可拖动
				},
				
				series : 
				[// 如果有多个分类需要显示，这在此处设置各个分类的相关配置属性
				// eg.设置各个分类在分类名称框中的分类名称
				// [label: 'Traps Division'},{label: 'Decoy Division'},{label:
				// 'Harmony Division'}]
				// 配置参数设置同seriesDefaults
				],

				legend : 
				{
					show : false,// 设置是否出现分类名称框（即所有分类的名称出现在图的某个位置）
					location : 'ne', // 分类名称框出现位置, nw, n, ne, e, se, s, sw, w.
					xoffset : 12, // 分类名称框距图表区域上边框的距离（单位px）
					yoffset : 12, // 分类名称框距图表区域左边框的距离(单位px)
					background : '', // 分类名称框距图表区域背景色
					textColor : '' // 分类名称框距图表区域内字体颜色
				},

				grid : 
				{
					drawGridLines : true, // wether to draw lines across the  grid or not.
					gridLineColor : '#cccccc', // 设置整个图标区域网格背景线的颜色
					background : '#fffdf6', // 设置整个图表区域的背景色
					borderColor : '#999999', // 设置图表的(最外侧)边框的颜色
					borderWidth : 2.0, // 设置图表的（最外侧）边框宽度
					shadow : true, // 为整个图标（最外侧）边框设置阴影，以突出其立体效果
					shadowAngle : 45, // 设置阴影区域的角度，从x轴顺时针方向旋转
					shadowOffset : 1.5, // 设置阴影区域偏移出图片边框的距离
					shadowWidth : 3, // 设置阴影区域的宽度
					shadowDepth : 3, // 设置影音区域重叠阴影的数量
					shadowAlpha : 0.07, // 设置阴影区域的透明度
					renderer : $.jqplot.CanvasGridRenderer, // renderer to use to draw the grid.
					rendererOptions : {}
				},

				/** **********************jqPlot各个不同插件的Option对象设置***************************** */

				// BarRenderer（设置【柱状图】的Option对象）
				// 该Option对象适用与柱状图的series和seriesDefault属性的相关配置对象设置
				seriesDefaults : 
				{
					rendererOptions : 
					{
						barPadding : 8, // 设置同一分类两个柱状条之间的距离（px）
						barMargin : 10, // 设置不同分类的两个柱状条之间的距离（px）（同一个横坐标表点上）
						barDirection : 'vertical', // 设置柱状图显示的方向：垂直显示和水平显示 默认垂直显示 vertical or horizontal.
						barWidth : null, // 设置柱状图中每个柱状条的宽度
						shadowOffset : 2, // 同grid相同属性设置
						shadowDepth : 5, // 同grid相同属性设置
						shadowAlpha : 0.8 // 同grid相同属性设置
					}
				},

				// Cursor(光标)
				// 鼠标移动到图中时，鼠标在图中显示形式，常与和高亮功能同时使用
				// 此外，通过设置该属性的zoom相关属性来对图中某个区域钻取（就选定区域放大）
				// 该配置对象直接在option下配置
				cursor : 
				{
					style : 'crosshair', // 当鼠标移动到图片上时，鼠标的显示样式，该属性值为css类
					show : true, // 是否显示光标
					showTooltip : true, // 是否显示提示信息栏
					followMouse : false, // 光标的提示信息栏是否随光标（鼠标）一起移动
					tooltipLocation : 'se', // 光标提示信息栏的位置设置。如果followMouse=true,那么该位置为
					// 提示信息栏相对于光标的位置。否则，为光标提示信息栏在图标中的位置
					// 该属性可选值： n, ne, e, se, etc.
					tooltipOffset : 6, // 提示信息栏距鼠标(followMouse=true)或坐标轴（followMouse=false）的位置
					showTooltipGridPosition : false,// 是否在信息提示栏中显示光标位置（取其据图标左和上边缘线像素距离）
					showTooltipUnitPosition : true,// 是否显示提示光标所在位置（取其在横纵轴上数据值）的信息栏
					// 注：注意此处与showTooltipGridPosition值区别，前者显示坐标值，该处显示的是数据值
					tooltipFormatString : '%.4P', // 同Highlighter的tooltipFormatString
					useAxesFormatters : true, // 同Highlighter的tooltipFormatString
					tooltipAxesGroups : []// show only specified axes groups
				},

				// Dragable（拖动）
				// 该配置对象通过seriesDefaults和series配置对象进行配置
				seriesDefaults : 
				{
					dragable :
					{
						color : undefined, // 当拖动数据点是，拖动线与拖动数据点颜色
						constrainTo : 'none'// 设置拖动的的范围: 'x'（只能在横向上拖动）,
					// 'y'（只能在纵向上拖动）, or 'none'（无限制）.
					}
				},
				// Highlighter（高亮）
				// 设置高亮动作option属性对象
				// 鼠标移动到某个数据点上时，该数据点增大并显示提示信息框
				// 该配置对象直接在option下配置
				highlighter :
				{
					lineWidthAdjust : 2.5, // 当鼠标移动到放大的数据点上时，设置增大的数据点的宽度
					// 目前仅适用于非实心数据点
					sizeAdjust : 5, // 当鼠标移动到数据点上时，数据点扩大的增量增量
					showTooltip : true, // 是否显示提示信息栏
					tooltipLocation : 'nw', // 提示信息显示位置（英文方向的首写字母）: n, ne, e,se, s, sw, w, nw.
					fadeTooltip : true, // 设置提示信息栏出现和消失的方式（是否淡入淡出）
					tooltipFadeSpeed : "fast",// 设置提示信息栏淡入淡出的速度： slow, def,fast, 或者是一个毫秒数的值.
					tooltipOffset : 2, // 提示信息栏据被高亮显示的数据点的偏移位置，以像素计。
					tooltipAxes : 'both', // 提示信息框显示数据点那个坐标轴上的值，目前有横/纵/横纵三种方式。
					// 值分别为 x, y or xy.
					tooltipSeparator : '',// 提示信息栏不同值之间的间隔符号
					useAxesFormatters : true, // 提示信息框中数据显示的格式是否和该数据在坐标轴上显示格式一致
					tooltipFormatString : '%.5P' // 用于设置提示信息框中数据显示的格式，前提条件是useAxesFormatters
					// 为false. 此时信息提示框中数据格式不再与坐标轴一致，而是以此为准
				},

				// LogAxisRenderer(指数渲染器)
				// 该渲染器只有两个属性， 指数渲染器通过axesDefaults和axes配置对象进行配置
				axesDefaults :
				{
					base : 10, // 指数的底数
					tickDistribution : 'even'// 坐标轴显示方式：'even' or 'power'.
												// 'even' 产生的是均匀分布于坐标
												// 轴上的坐标刻度值 。而'power' 则是根据不断增大的增数来确定坐标轴上的刻度
				},

				// PieRenderer(设置【饼状图】的OPtion对象)
				// 饼状图通过seriesDefaults和series配置对象进行配置
				seriesDefaults :
				{
					rendererOptions : {
						diameter : undefined, // 设置饼的直径
						padding : 20, // 饼距离其分类名称框或者图表边框的距离，变相该表饼的直径
						sliceMargin : 20, // 饼的每个部分之间的距离
						fill : true, // 设置饼的每部分被填充的状态
						shadow : true, // 为饼的每个部分的边框设置阴影，以突出其立体效果
						shadowOffset : 2, // 设置阴影区域偏移出饼的每部分边框的距离
						shadowDepth : 5, // 设置阴影区域的深度
						shadowAlpha : 0.07// 设置阴影区域的透明度
					}
				},

				// pointLabels(数据点标签)
				// 用于在数据点所在位置显示相关信息（非提示框性质）
				seriesDefaults :
				{
					pointLabels :
					{
						location : 's',// 数据标签显示在数据点附近的方位
						ypadding : 2// 数据标签距数据点在纵轴方向上的距离
					}
				},

				// Trendline（【趋势线】）
				// 饼状图通过seriesDefaults和series配置对象进行配置
				seriesDefaults :
				{
					trendline :
					{
						show : true, // 是否显示趋势线
						color : '#666666', // 趋势线颜色
						label : '', // 趋势线名称
						type : 'linear', // 趋势线类型'linear'（直线）,
												// 'exponential'（幂值数线） or 'exp'
						shadow : true, // 同grid相同属性设置
						lineWidth : 1.5, // 趋势线宽度
						shadowAngle : 45, // 同grid相同属性设置
						shadowOffset : 1.5, // 同grid相同属性设置
						shadowDepth : 3, // 同grid相同属性设置
						shadowAlpha : 0.07
						// 同grid相同属性设置
					 }
				  }
		}
});