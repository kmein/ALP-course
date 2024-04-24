<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet
version="2.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:tei="http://www.tei-c.org/ns/1.0">
<xsl:output method="text"/>
<xsl:template match="/">
  <xsl:text>id,surface,lemma,lemmaId,grammar,morphosyntax&#10;</xsl:text>
  <xsl:apply-templates select="//tei:fs"/>
</xsl:template>

<xsl:template match="tei:fs">
  <xsl:if test="tei:f[@name='surface']">
    <!-- output row only if surface is present -->
    <xsl:value-of select="@xml:id"/>
    <xsl:text>,</xsl:text>

    <xsl:value-of select="tei:f[@name='surface']/tei:string"/>
    <xsl:text>,</xsl:text>

    <xsl:value-of select="concat('&quot;', tei:f[@name='gra_lemma']/tei:string, '&quot;')"/>
    <xsl:text>,</xsl:text>

    <xsl:value-of select="tei:f[@name='gra_lemma']/tei:string/@correction | tei:f[@name='gra_lemma']/tei:string/@match"/>
    <xsl:text>,</xsl:text>

    <xsl:value-of select="tei:f[@name='gra_gramm']/tei:symbol/@value"/>
    <xsl:text>,</xsl:text>

    <xsl:for-each select="tei:f[@name='morphosyntax']/tei:fs/tei:f">
      <xsl:value-of select="@name"/>
      <xsl:text>=</xsl:text>

      <xsl:value-of select="tei:symbol/@value"/>

      <xsl:if test="position() != last()">
        <xsl:text>|</xsl:text>
      </xsl:if>
    </xsl:for-each>

    <xsl:text>&#10;</xsl:text>
  </xsl:if>
</xsl:template>
</xsl:stylesheet>
