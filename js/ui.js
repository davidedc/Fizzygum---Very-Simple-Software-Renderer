// Modified drawShapesImpl to accept ctx as parameter
function drawShapesImpl(shapes, isCanvas, ctx = null) {
  const swLineRenderer = new SWRendererLine();
  const swRectRenderer = new SWRendererRect(frameBuffer, width, height, swLineRenderer);
  const swRoundedRectRenderer = new SWRendererRoundedRect(frameBuffer, width, height, swLineRenderer);
  
  for (let shape of shapes) {
    if (shape.type === 'line') {
      if (isCanvas) {
        drawLineCanvas(ctx, 
          shape.start.x, shape.start.y,
          shape.end.x, shape.end.y,
          shape.thickness,
          shape.color.r, shape.color.g, shape.color.b, shape.color.a
        );
      } else {
        swLineRenderer.drawLine(
          shape.start.x, shape.start.y,
          shape.end.x, shape.end.y,
          shape.thickness,
          shape.color.r, shape.color.g, shape.color.b, shape.color.a
        );
      }
    } else if (shape.type === 'rect') {
      if (isCanvas) {
        drawRectCanvas(ctx, shape);
      } else {
        swRectRenderer.drawRect(shape);
      }
    } else if (shape.type === 'roundedRect') {
      if (isCanvas) {
        drawRoundedRectCanvas(ctx, shape);
      } else {
        swRoundedRectRenderer.drawRoundedRect(shape);
      }
    } else if (shape.type === 'circle') {
      const draw = isCanvas ? drawCircleCanvas : drawCircleSW;
      isCanvas ? draw(ctx, shape) : draw(shape);
    } else if (shape.type === 'arc') {
      const draw = isCanvas ? drawArcCanvas : drawArcSW;
      isCanvas ? draw(ctx, shape) : draw(shape);
    } else if (shape.type === 'roundedRect') {
      const draw = isCanvas ? drawRoundedRectCanvas : drawRoundedRectSW;
      isCanvas ? draw(ctx, shape) : draw(shape);
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  addRenderComparisons();

  // Create navigation after all sections are added
  RenderComparison.createNavigation();
});

function addRenderComparisons() {
  add1PxHorizontalLineCenteredAtPixelComparison();
  add1PxVerticalLineCenteredAtPixelComparison();
  add2PxHorizontalLineCenteredAtGridComparison();
  add2PxVerticalLineCenteredAtGridComparison();
  addBlackLinesComparison(1);  // 1px lines
  addBlackLinesComparison(2);  // 2px lines
  addBlackLinesComparison(3);  // 3px lines
  addBlackLinesComparison(5);  // 5px lines
  addBlackLinesComparison(10); // 10px lines
  add1PxStrokedRoundedRectCenteredAtGridComparison();
  add1PxStrokedRoundedRectCenteredAtPixelComparison();
  addCenteredRoundedRectComparison();
  addThinRoundedRectsComparison();
  addEverythingTogetherComparison();
}